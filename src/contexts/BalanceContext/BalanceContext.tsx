import isValidDomain from 'is-valid-domain';
import React, { createContext, useCallback, useEffect, useMemo } from 'react';

import { searchCoinData } from '@helpers/utilities';
import { useState } from '@hookstate/core';
import { interestBearingTokens } from '@models/deposit';
import { fetchInterestBearingTokens, fetchStablecoins } from '@models/depositTokens';
import { networks } from '@models/network';
import { AccountBalance, stablecoins as stbCoins } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import { globalWalletState } from '@stores/WalletStore';
import Logger from '@utils/logger';

import useCovalentBalances from './useCovalentBalances';
import useZerionBalances from './useZerionBalances/useZerionBalances';

export const BalanceContext = createContext<AccountBalance>({} as AccountBalance);

const BalanceProvider: React.FC = ({ children }) => {
	const { address } = useState(globalWalletState()).value;
	const [tokens, setTokens] = React.useState<MinkeToken[]>([]);
	const [stablecoins, setStablecoins] = React.useState<MinkeToken[]>([]);
	const [interestTokens, setInterestTokens] = React.useState<MinkeToken[]>([]);
	const [loading, setLoading] = React.useState(true);

	const suggestedTokens = Object.values(networks)
		.map((n) => n.suggestedTokens)
		.flat();

	const fetchInterests = useCallback(async () => {
		const allInterestTokens = await fetchInterestBearingTokens(address);
		setInterestTokens(allInterestTokens.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
		setStablecoins(await fetchStablecoins(address));
	}, [address]);

	const fillSuggestedTokens = (tokensWithBalance: MinkeToken[]): MinkeToken[] => {
		const notFoundTokens = suggestedTokens.filter((suggested) => {
			const found = tokensWithBalance.find((t) => t.symbol.toLowerCase() === suggested.symbol.toLowerCase());
			return !found;
		});
		return [...tokensWithBalance, ...notFoundTokens];
	};

	const processTokens = async (coins: MinkeToken[]) => {
		let allTokens = coins.filter(
			({ symbol, balance = '0', name = '', balanceUSD = 0, address: tokenAddress }) =>
				!interestBearingTokens.includes(symbol.toLowerCase()) &&
				!stbCoins.includes(symbol) &&
				+balance > 0 &&
				(balanceUSD > 0 ||
					suggestedTokens.map((t) => t.address.toLowerCase()).includes(tokenAddress.toLowerCase())) &&
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

	const fallbackWithCovalentData = async (coins: MinkeToken[]) => {
		const { tokens: allTokens } = await useCovalentBalances(address);
		const fallback: MinkeToken[] = [];
		const foundAddresses = coins.map((t) => t.address.toLowerCase());
		foundAddresses.push('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

		allTokens.forEach((token) => {
			if (!foundAddresses.includes(token.address.toLowerCase())) {
				fallback.push(token);
			}
		});
		processTokens([...coins, ...fallback]);
	};

	useEffect(() => {
		fetchInterests();
	}, [address]);

	useEffect(() => {
		const fetchBalances = async (loadingUI = true) => {
			if (address) {
				let fallbacking = false;
				try {
					if (loadingUI) setLoading(true);
					const allTokens = await useZerionBalances({ address });
					await processTokens(allTokens);
					fallbackWithCovalentData(allTokens);
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
	}, [address]);

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
			stablecoins,
			stablecoinsBalance,
			loading
		}),
		[address, tokens, interestTokens, loading]
	);

	return <BalanceContext.Provider value={obj}>{children}</BalanceContext.Provider>;
};

export default BalanceProvider;
