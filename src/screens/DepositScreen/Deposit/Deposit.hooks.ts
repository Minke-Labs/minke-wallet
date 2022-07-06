import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeToken } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { usdCoinSettingsKey } from '@models/deposit';
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
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import Deposit from '@src/services/deposit/DepositService';
import { captureException } from '@sentry/react-native';

export const useDeposit = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { nativeToken, balance } = useNativeToken();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { depositableTokens = [] } = useTokens();
	const { address, privateKey } = globalWalletState().value;
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const [token, setToken] = React.useState<MinkeToken>();
	const [amount, setAmount] = React.useState('0');
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [blockchainError, setBlockchainError] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const { addPendingTransaction } = useTransactions();
	const { setSelectedUSDCoin, apy, depositableToken, selectedProtocol } = useDepositProtocols();

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/,/g, '.');
		if (!formatedValue || (!formatedValue.endsWith('.') && !formatedValue.startsWith('.'))) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas =
		gaslessEnabled || (balance && gweiValue && balance.gte(parseUnits(gweiValue.toString(), 'gwei')));
	const canDeposit =
		token &&
		token.balance &&
		+amount > 0 &&
		+token.balance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || gweiValue > 0); // if gasless we dont need a gwei value

	const onDeposit = async () => {
		Keyboard.dismiss();
		if (canDeposit && depositableToken && selectedProtocol && token) {
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

	const onTokenSelect = async (selectedToken: MinkeToken) => {
		hideModal();
		setToken(selectedToken);
		await AsyncStorage.setItem(usdCoinSettingsKey, selectedToken.symbol);
		setSelectedUSDCoin(selectedToken.symbol);
	};

	useEffect(() => {
		if (depositableToken && depositableTokens.length > 0) {
			const balanceToken = depositableTokens.find(
				({ symbol }) => symbol.toLowerCase() === depositableToken.symbol.toLowerCase()
			);
			setToken(balanceToken);
		}
	}, [depositableToken, depositableTokens]);

	return {
		token,
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
		tokens: depositableTokens,
		apy,
		selectedProtocol,
		blockchainError,
		setBlockchainError
	};
};
