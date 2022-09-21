import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeToken } from '@models/types/token.types';
import { globalExchangeState } from '@stores/ExchangeStore';
import {
	useAmplitude,
	useNavigation,
	useBalances,
	useNativeToken,
	useBiconomy,
	useTransactions,
	useDepositProtocols,
	useWalletManagement,
	useGlobalWalletState
} from '@hooks';
import Logger from '@utils/logger';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import WithdrawService from '@src/services/withdraw/WithdrawService';
import { captureException } from '@sentry/react-native';
import { constants } from 'ethers';
import gasLimits, { Networks } from '@models/gas';

const useWithdrawScreen = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { nativeToken, balance } = useNativeToken();
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [token, setToken] = React.useState<MinkeToken>();
	const [amount, setAmount] = React.useState('0');
	const { gas } = useState(globalExchangeState()).value;
	const { maxFeePerGas = constants.Zero, maxPriorityFeePerGas = constants.Zero } = gas || {};
	const { withdrawableTokens: tokens } = useBalances();
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [blockchainError, setBlockchainError] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const navigation = useNavigation();
	const { track } = useAmplitude();
	const { addPendingTransaction } = useTransactions();
	const {
		address,
		privateKey,
		network: { id }
	} = useGlobalWalletState();
	const { defaultToken, selectedProtocol, apy } = useDepositProtocols(true);
	const { canSendTransactions, needToChangeNetwork, walletConnect, connector } = useWalletManagement();

	const showModal = () => {
		Keyboard.dismiss();
		setSearchVisible(true);
	};

	const hideModal = () => {
		Keyboard.dismiss();
		setSearchVisible(false);
	};

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/,/g, '.');
		if (!formatedValue || (!formatedValue.endsWith('.') && !formatedValue.startsWith('.'))) {
			setAmount(formatedValue);
		}
	};

	const onTokenSelect = (selectedToken: MinkeToken) => {
		hideModal();
		setToken(selectedToken);
	};

	const gasUnits = selectedProtocol ? gasLimits[id as Networks].deposit[selectedProtocol.id] : 1;
	const enoughForGas = gaslessEnabled || (balance && maxFeePerGas ? balance.gte(maxFeePerGas.mul(gasUnits)) : true);

	const canWithdraw =
		canSendTransactions &&
		token &&
		token.balance &&
		+amount > 0 &&
		+token.balance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || !maxFeePerGas.isZero());

	const onWithdraw = async () => {
		Keyboard.dismiss();
		if (canWithdraw && token && token.interestBearingToken && selectedProtocol) {
			setWaitingTransaction(true);
			try {
				const hash = await new WithdrawService(selectedProtocol.id).withdraw({
					gasless: gaslessEnabled,
					address,
					privateKey,
					amount: formatUnits(toBn(amount, token.interestBearingToken.decimals), 'wei'),
					minAmount: formatUnits(toBn((Number(amount) * 0.97).toString(), token.decimals), 'wei'),
					token: token.address,
					interestBearingToken: token.interestBearingToken.address,
					maxFeePerGas,
					maxPriorityFeePerGas,
					biconomy,
					connector,
					walletConnect
				});

				if (hash) {
					Logger.log(`Withdraw ${JSON.stringify(hash)}`);
					setTransactionHash(hash);
					track('Withdraw done', {
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
							{ type: 'incoming', symbol: token.symbol, amount: +amount },
							{ type: 'outgoing', symbol: token.interestBearingToken.symbol, amount: +amount }
						]
					});

					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'withdrawal' });
				} else {
					Logger.error('Error withdrawing');
				}
				setWaitingTransaction(false);
			} catch (error) {
				setWaitingTransaction(false);
				captureException(error);
				Logger.error('Withdraw blockchain error', error);
				setBlockchainError(true);
			}
		}
	};

	useEffect(() => {
		if (!!defaultToken && !token) {
			setToken(defaultToken);
		}
	}, [defaultToken]);

	return {
		searchVisible,
		token,
		nativeToken,
		canWithdraw,
		enoughForGas,
		showModal,
		hideModal,
		updateAmount,
		onTokenSelect,
		onWithdraw,
		transactionHash,
		waitingTransaction,
		tokens,
		gaslessEnabled,
		selectedProtocol,
		apy,
		blockchainError,
		setBlockchainError,
		canSendTransactions,
		needToChangeNetwork
	};
};

export default useWithdrawScreen;
