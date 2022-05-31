import React, { useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useState } from '@hookstate/core';
import { ParaswapToken } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { depositableTokenToParaswapToken, usdCoinSettingsKey } from '@models/deposit';
import {
	useNavigation,
	useTokens,
	useAmplitude,
	useBiconomy,
	useNativeToken,
	useTransactions,
	useDepositProtocols
} from '@hooks';
import Logger from '@utils/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toBn } from 'evm-bn';
import { formatUnits } from 'ethers/lib/utils';
import Deposit from '@src/services/deposit/DepositService';
import { getProvider } from '@models/wallet';
import { captureException } from '@sentry/react-native';

export const useDeposit = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { nativeToken } = useNativeToken();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { depositableTokens: tokens = [], tokens: allTokens = [] } = useTokens();
	const { address, privateKey } = globalWalletState().value;
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const [token, setToken] = React.useState<ParaswapToken>();
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [amount, setAmount] = React.useState('0');
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [blockchainError, setBlockchainError] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const { addPendingTransaction } = useTransactions();
	const { setSelectedUSDCoin, apy, depositableToken, selectedProtocol } = useDepositProtocols();

	const balanceFrom = useCallback(
		(paraSwapToken: ParaswapToken | undefined): string => {
			if (!paraSwapToken) {
				return '0';
			}
			const walletToken = [...tokens, ...allTokens].find(
				(owned) => owned.symbol.toLowerCase() === paraSwapToken.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(+walletToken.balance - gasPrice, 0).toString();
			}

			return walletToken ? walletToken.balance : '0';
		},
		[tokens, allTokens, nativeToken, gas]
	);

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/,/g, '.');
		if (!formatedValue || (!formatedValue.endsWith('.') && !formatedValue.startsWith('.'))) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas = gaslessEnabled || (nativeToken && +balanceFrom(nativeToken) > 0);
	const canDeposit =
		token &&
		+tokenBalance > 0 &&
		+amount > 0 &&
		+tokenBalance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || gweiValue > 0); // if gasless we dont need a gwei value

	const onDeposit = async () => {
		Keyboard.dismiss();
		if (canDeposit && depositableToken && selectedProtocol) {
			setWaitingTransaction(true);
			try {
				const hash = await new Deposit(selectedProtocol.id).deposit({
					address,
					privateKey,
					amount: formatUnits(toBn(amount, token.decimals), 'wei'),
					minAmount: formatUnits(toBn((Number(amount) * 0.97).toString(), token.decimals), 'wei'),
					gasPrice: gweiValue.toString(),
					depositableToken,
					gasless: gaslessEnabled,
					biconomy
				});

				if (hash) {
					Logger.log(`Deposit ${JSON.stringify(hash)}`);
					setTransactionHash(hash);
					track('Deposited', {
						token: token.symbol,
						amount,
						hash,
						gasless: gaslessEnabled
					});
					addPendingTransaction({
						from: token.address,
						destination: address,
						hash,
						txSuccessful: true,
						pending: true,
						timeStamp: (new Date().getTime() / 1000).toString(),
						amount,
						direction: 'exchange',
						symbol: token.symbol,
						subTransactions: [
							{ type: 'outgoing', symbol: token.symbol, amount: +amount },
							{ type: 'incoming', symbol: depositableToken.interestBearingToken.symbol, amount: +amount }
						]
					});
					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' });
				} else {
					Logger.error('Error depositing');
				}
			} catch (error) {
				setWaitingTransaction(false);
				captureException(error);
				Logger.error('Deposit blockchain error', error);
				setBlockchainError(true);
			}
		}
	};

	const showModal = () => {
		Keyboard.dismiss();
		setSearchVisible(true);
	};

	const hideModal = () => {
		Keyboard.dismiss();
		setSearchVisible(false);
	};

	const onTokenSelect = async (selectedToken: ParaswapToken) => {
		hideModal();
		setToken(selectedToken);
		await AsyncStorage.setItem(usdCoinSettingsKey, selectedToken.symbol);
		setSelectedUSDCoin(selectedToken.symbol);
	};

	useEffect(() => {
		if (token && tokens && tokens.length > 0) {
			setTokenBalance(balanceFrom(token));
		} else {
			setTokenBalance('0');
		}
	}, [tokens, token]);

	useEffect(() => {
		if (depositableToken && !token) {
			setToken(depositableTokenToParaswapToken(depositableToken));
		}
	}, [depositableToken]);

	return {
		token,
		tokenBalance,
		updateAmount,
		canDeposit,
		onDeposit,
		waitingTransaction,
		transactionHash,
		nativeToken,
		enoughForGas,
		gaslessEnabled,
		searchVisible,
		hideModal,
		showModal,
		onTokenSelect,
		tokens,
		apy,
		selectedProtocol,
		blockchainError,
		setBlockchainError
	};
};
