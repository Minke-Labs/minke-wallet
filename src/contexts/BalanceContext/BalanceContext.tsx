import React, { createContext, useEffect, useMemo } from 'react';
import EventSource from 'react-native-sse';
import { useState } from '@hookstate/core';
import { AccountBalance } from '@models/token';
import { generateEventSourceDict, generateUrl } from '@src/services/apis/zapper/zapper';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';
import Logger from '@utils/logger';
import { fetchInterestBearingTokens } from '@models/depositTokens';
import { depositStablecoins, interestBearingTokens } from '@models/deposit';
import isValidDomain from 'is-valid-domain';
import { globalDepositState } from '@stores/DepositStore';
import { parse, ZapperCustomEvents } from './utils';

export const BalanceContext = createContext<AccountBalance>({} as AccountBalance);

const BalanceProvider: React.FC = ({ children }) => {
	const {
		address,
		network: { zapperNetwork }
	} = useState(globalWalletState()).value;
	const { id: selectedProtocol } = useState(globalDepositState()).value;
	const [tokens, setTokens] = React.useState<MinkeToken[]>([]);
	const [interestTokens, setInterestTokens] = React.useState<MinkeToken[]>([]);
	const [withdrawableTokens, setWithdrawableTokens] = React.useState<MinkeToken[]>([]);

	useEffect(() => {
		const fetchInterests = async () => {
			if (selectedProtocol) {
				const allInterestTokens = await fetchInterestBearingTokens(address, selectedProtocol);
				const [withdrawable] = allInterestTokens;
				const interest = allInterestTokens.flat();
				setInterestTokens(interest.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
				setWithdrawableTokens(withdrawable.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001));
			}
		};

		fetchInterests();
	}, [selectedProtocol]);

	useEffect(() => {
		const fetchBalances = async () => {
			if (address) {
				const tokensBalances: MinkeToken[][] = [];
				const url = generateUrl([address], [zapperNetwork]);
				const eventSourceDict = generateEventSourceDict();
				const eventSource = new EventSource<ZapperCustomEvents>(url, eventSourceDict);

				// when balance event is received, the data is parsed
				// Zapper objects can be huge so parsing logic is extracted to ./utils.js
				// @ts-ignore
				eventSource.addEventListener('balance', ({ data }) => {
					const parsedDatas = JSON.parse(data);
					const {
						appId,
						balance: { wallet }
					} = parsedDatas;
					const apiTokens = Object.keys(wallet);
					if (appId === 'tokens' && apiTokens.length > 0) {
						tokensBalances.push(parse(wallet));
					}
				});

				// when the data feed has been completely sent
				eventSource.addEventListener('end', () => {
					let allTokens = tokensBalances.flat();
					allTokens = allTokens.filter(
						({ symbol, balance = '0', name = '' }) =>
							!interestBearingTokens.includes(symbol.toLowerCase()) &&
							+balance > 0 &&
							!isValidDomain(name)
					);
					setTokens(allTokens);
					eventSource.close();
				});

				// @ts-ignore
				eventSource.addEventListener('error', ({ message }) => {
					Logger.log('Zapper API Error :', message);
				});
			}
		};
		fetchBalances();
		const intervalId = setInterval(() => {
			fetchBalances();
		}, 1000 * 30);
		return () => clearInterval(intervalId);
	}, [address, zapperNetwork]);

	const depositableTokens = tokens.filter(
		(token) => depositStablecoins.includes(token.symbol) && +token.balance! > 0
	);
	const walletBalance = tokens.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const depositedBalance = interestTokens.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const balance = walletBalance + depositedBalance;

	const obj = useMemo(
		() => ({
			address,
			tokens,
			balance,
			depositedBalance,
			walletBalance,
			interestTokens,
			depositableTokens,
			withdrawableTokens
		}),
		[address, zapperNetwork, selectedProtocol, tokens, interestTokens, withdrawableTokens]
	);

	return <BalanceContext.Provider value={obj}>{children}</BalanceContext.Provider>;
};

export default BalanceProvider;
