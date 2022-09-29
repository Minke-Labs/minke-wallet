import React, { createContext, useCallback, useEffect, useMemo } from 'react';
import EventSource from 'react-native-sse';
import { useState } from '@hookstate/core';
import { AccountBalance } from '@models/token';
import { generateEventSourceDict, generateUrl } from '@src/services/apis/zapper/zapper';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';
import Logger from '@utils/logger';
import { fetchInterestBearingTokens, fetchStablecoins } from '@models/depositTokens';
import { depositStablecoins, interestBearingTokens } from '@models/deposit';
import isValidDomain from 'is-valid-domain';
import { globalDepositState } from '@stores/DepositStore';
import { searchCoinData } from '@helpers/utilities';
import { parse, ZapperCustomEvents } from './utils';
import useCovalentBalances from './useCovalentBalances';

export const BalanceContext = createContext<AccountBalance>({} as AccountBalance);

const BalanceProvider: React.FC = ({ children }) => {
	const {
		address,
		network: { zapperNetwork, suggestedTokens, coingeckoPlatform }
	} = useState(globalWalletState()).value;
	const { id: selectedProtocol } = useState(globalDepositState()).value;
	const [tokens, setTokens] = React.useState<MinkeToken[]>([]);
	const [stablecoins, setStablecoins] = React.useState<MinkeToken[]>([]);
	const [interestTokens, setInterestTokens] = React.useState<MinkeToken[]>([]);
	const [withdrawableTokens, setWithdrawableTokens] = React.useState<MinkeToken[]>([]);
	const [loading, setLoading] = React.useState(true);

	const fetchInterests = async () => {
		if (selectedProtocol) {
			const allInterestTokens = await fetchInterestBearingTokens(address, selectedProtocol);
			const [withdrawable] = allInterestTokens;
			const interest = allInterestTokens.flat();
			setInterestTokens(interest.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
			setWithdrawableTokens(withdrawable.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
		}
		setStablecoins(await fetchStablecoins(address));
	};

	const fillSuggestedTokens = useCallback(
		(tokensWithBalance: MinkeToken[]): MinkeToken[] => {
			const notFoundTokens = suggestedTokens.filter((suggested) => {
				const found = tokensWithBalance.find(
					(t) => t.address.toLowerCase() === suggested.address.toLowerCase()
				);
				return !found;
			});
			return [...tokensWithBalance, ...notFoundTokens];
		},
		[suggestedTokens]
	);

	const processTokens = async (coins: MinkeToken[]) => {
		let allTokens = coins.filter(
			({ symbol, balance = '0', name = '' }) =>
				!interestBearingTokens.includes(symbol.toLowerCase()) &&
				!depositStablecoins.includes(symbol) &&
				+balance > 0 &&
				!isValidDomain(name)
		);
		allTokens = fillSuggestedTokens(allTokens);
		const promises = allTokens.map(async (t) => {
			const { id, name } = await searchCoinData(t.address, coingeckoPlatform, t.symbol, t.id);

			return {
				...t,
				id,
				name
			};
		});
		allTokens = await Promise.all(promises);
		setTokens(allTokens);
		setStablecoins(await fetchStablecoins(address));
		setLoading(false);
	};

	useEffect(() => {
		fetchInterests();
	}, [selectedProtocol, address, zapperNetwork]);

	useEffect(() => {
		const fetchBalances = async (loadingUI = true) => {
			if (address) {
				let fallbacking = false;
				try {
					if (loadingUI) setLoading(true);
					const tokensBalances: MinkeToken[][] = [];
					const url = generateUrl([address], [zapperNetwork]);
					const eventSourceDict = generateEventSourceDict();
					const eventSource = new EventSource<ZapperCustomEvents>(url, eventSourceDict);

					// when balance event is received, the data is parsed
					// Zapper objects can be huge so parsing logic is extracted to ./utils.js
					// @ts-ignore
					eventSource.addEventListener('balance', async ({ data }) => {
						const parsedDatas = JSON.parse(data);
						const {
							appId,
							balance: { wallet }
						} = parsedDatas;
						const apiTokens = Object.keys(wallet);
						if (appId === 'tokens' && apiTokens.length > 0) {
							const parsed = parse(wallet);
							tokensBalances.push(parsed);
						}
					});

					// when the data feed has been completely sent
					eventSource.addEventListener('end', async () => {
						await processTokens(tokensBalances.flat());
						eventSource.close();
					});

					// @ts-ignore
					eventSource.addEventListener('error', async ({ message }) => {
						Logger.log('Zapper API Error :', message);
						fallbacking = true;
						const { tokens: allTokens } = await useCovalentBalances(address);
						await processTokens(allTokens);
					});
				} catch {
					if (!fallbacking) {
						// already fallback with Covalent
						fallbacking = true;
						const { tokens: allTokens } = await useCovalentBalances(address);
						await processTokens(allTokens);
					} else {
						setTokens([]);
						setLoading(false);
					}
				}
			}
		};
		fetchBalances();
		const intervalId = setInterval(() => {
			fetchBalances(false);
			fetchInterests();
		}, 1000 * 30);
		return () => clearInterval(intervalId);
	}, [address, zapperNetwork]);

	const stablecoinsBalance = stablecoins.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const walletBalance = tokens.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const depositedBalance = interestTokens.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const balance = walletBalance + depositedBalance + stablecoinsBalance;

	const obj: AccountBalance = useMemo(
		() => ({
			address,
			tokens,
			balance,
			depositedBalance,
			walletBalance,
			interestTokens,
			withdrawableTokens,
			stablecoins,
			stablecoinsBalance,
			loading
		}),
		[
			address,
			zapperNetwork,
			selectedProtocol,
			tokens,
			interestTokens,
			withdrawableTokens,
			loading,
			coingeckoPlatform
		]
	);

	return <BalanceContext.Provider value={obj}>{children}</BalanceContext.Provider>;
};

export default BalanceProvider;
