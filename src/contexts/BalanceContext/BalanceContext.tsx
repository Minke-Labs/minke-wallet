import React, { createContext, useCallback, useEffect, useMemo } from 'react';
import { useState } from '@hookstate/core';
import { stablecoins as stbCoins, AccountBalance } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';
import Logger from '@utils/logger';
import { fetchInterestBearingTokens, fetchStablecoins } from '@models/depositTokens';
import { interestBearingTokens } from '@models/deposit';
import isValidDomain from 'is-valid-domain';
import { globalDepositState } from '@stores/DepositStore';
import { searchCoinData } from '@helpers/utilities';
import { networks } from '@models/network';
import useCovalentBalances from './useCovalentBalances';
import useZerionBalances from './useZerionBalances/useZerionBalances';

export const BalanceContext = createContext<AccountBalance>({} as AccountBalance);

const BalanceProvider: React.FC = ({ children }) => {
	const {
		address,
		network: { chainId }
	} = useState(globalWalletState()).value;
	const { id: selectedProtocol } = useState(globalDepositState()).value;
	const [tokens, setTokens] = React.useState<MinkeToken[]>([]);
	const [stablecoins, setStablecoins] = React.useState<MinkeToken[]>([]);
	const [interestTokens, setInterestTokens] = React.useState<MinkeToken[]>([]);
	const [withdrawableTokens, setWithdrawableTokens] = React.useState<MinkeToken[]>([]);
	const [loading, setLoading] = React.useState(true);

	const fetchInterests = useCallback(async () => {
		if (selectedProtocol) {
			const allInterestTokens = await fetchInterestBearingTokens(address, selectedProtocol);
			const [withdrawable] = allInterestTokens;
			const interest = allInterestTokens.flat();
			setInterestTokens(interest.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
			setWithdrawableTokens(withdrawable.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
		}
		setStablecoins(await fetchStablecoins(address));
	}, [address, selectedProtocol]);

	const fillSuggestedTokens = (tokensWithBalance: MinkeToken[]): MinkeToken[] => {
		const suggestedTokens = Object.values(networks)
			.map((n) => n.suggestedTokens)
			.flat();
		const notFoundTokens = suggestedTokens.filter((suggested) => {
			const found = tokensWithBalance.find((t) => t.symbol.toLowerCase() === suggested.symbol.toLowerCase());
			return !found;
		});
		return [...tokensWithBalance, ...notFoundTokens];
	};

	const processTokens = async (coins: MinkeToken[]) => {
		let allTokens = coins.filter(
			({ symbol, balance = '0', name = '', balanceUSD = 0 }) =>
				!interestBearingTokens.includes(symbol.toLowerCase()) &&
				!stbCoins.includes(symbol) &&
				+balance > 0 &&
				balanceUSD > 0 &&
				!isValidDomain(name) &&
				!isValidDomain(symbol)
		);

		allTokens = fillSuggestedTokens(allTokens);
		try {
			const promises = allTokens.map(async (t) => {
				const { coingeckoPlatform } = Object.values(networks).find((n) => n.chainId === t.chainId);
				const { id, name } = await searchCoinData(t.address, coingeckoPlatform, t.symbol, t.id);

				return {
					...t,
					id,
					name: t.name || name
				};
			});
			allTokens = await Promise.all(promises);
		} catch (error) {
			Logger.log('Error on coingecko API', error);
		}
		setTokens(allTokens);
		setStablecoins(await fetchStablecoins(address));
		setLoading(false);
	};

	useEffect(() => {
		fetchInterests();
	}, [selectedProtocol, address, chainId]);

	useEffect(() => {
		const fetchBalances = async (loadingUI = true) => {
			if (address) {
				let fallbacking = false;
				try {
					if (loadingUI) setLoading(true);
					const allTokens = await useZerionBalances({ address });
					await processTokens(allTokens);
				} catch (error) {
					if (!fallbacking) {
						Logger.log('Covalent fallback', error);
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
	}, [address, chainId]);

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
		[address, chainId, selectedProtocol, tokens, interestTokens, withdrawableTokens, loading]
	);

	return <BalanceContext.Provider value={obj}>{children}</BalanceContext.Provider>;
};

export default BalanceProvider;
