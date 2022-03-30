import React, { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useState } from '@hookstate/core';
import { NativeTokens, nativeTokens, ParaswapToken } from '@models/token';
import { globalExchangeState } from '@stores/ExchangeStore';
import { network } from '@models/network';
import useDeposits from '@src/hooks/useDeposits';
import { useAmplitude, useAuthentication, useNavigation, useTokens } from '@hooks';
import Logger from '@utils/logger';
import { getProvider } from '@models/wallet';
import { Wallet } from 'ethers';
import { globalWalletState } from '@stores/WalletStore';
import { withdrawTransaction } from '@models/withdraw';

const useWithdrawScreen = () => {
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [token, setToken] = React.useState<ParaswapToken>();
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [amount, setAmount] = React.useState('0');
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const { tokens } = useDeposits();
	const { tokens: balances } = useTokens();
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const { showAuthenticationPrompt } = useAuthentication();
	const navigation = useNavigation();
	const { track } = useAmplitude();

	const { address, privateKey } = globalWalletState().value;

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

	const balanceFrom = useCallback(
		(paraSwapToken: ParaswapToken | undefined, native = false): number => {
			if (!paraSwapToken) {
				return 0;
			}
			const walletToken = (native ? balances : tokens)?.find(
				(owned) => owned.symbol.toLowerCase() === paraSwapToken.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(+walletToken.balance - gasPrice, 0);
			}
			return walletToken ? +walletToken.balance : 0;
		},
		[balances, tokens, nativeToken, gas]
	);

	const onTokenSelect = (selectedToken: ParaswapToken) => {
		hideModal();
		setToken(selectedToken);
	};

	const enoughForGas = nativeToken && balanceFrom(nativeToken, true) > 0;
	const canWithdraw =
		token && +tokenBalance > 0 && +amount > 0 && +tokenBalance >= +amount && enoughForGas && gweiValue > 0;

	const onWithdraw = () => {
		showAuthenticationPrompt({
			onSuccess: async () => {
				Keyboard.dismiss();
				if (canWithdraw) {
					setWaitingTransaction(true);
					const { interestBearingAddress = '' } =
						tokens!.find((t) => t.symbol.toLowerCase() === token.symbol.toLowerCase()) || {};

					const transaction = await withdrawTransaction({
						address,
						privateKey,
						amount,
						toTokenAddress: token.address,
						decimals: token.decimals,
						interestBearingToken: interestBearingAddress,
						gweiValue
					});
					Logger.log(`Withdraw API ${JSON.stringify(transaction)}`);

					const { from, to, data, maxFeePerGas, maxPriorityFeePerGas, gas: gasLimit } = transaction;

					const provider = await getProvider();
					const wallet = new Wallet(privateKey, provider);
					const chainId = await wallet.getChainId();
					const nonce = await provider.getTransactionCount(address, 'latest');
					const txDefaults = {
						from,
						to,
						data,
						nonce,
						gasLimit,
						maxFeePerGas,
						maxPriorityFeePerGas,
						type: 2,
						chainId
					};
					Logger.log(`Withdraw ${JSON.stringify(txDefaults)}`);
					const signedTx = await wallet.signTransaction(txDefaults);
					const { hash, wait } = await provider.sendTransaction(signedTx as string);
					if (hash) {
						Logger.log(`Withdraw ${JSON.stringify(hash)}`);
						await wait();
						setTransactionHash(hash);
						track('Withdraw done', {
							token: token.symbol,
							amount,
							hash
						});
						navigation.navigate('SaveScreen');
					} else {
						Logger.error('Error depositing');
					}
				}
			}
		});
	};

	useEffect(() => {
		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setNativeToken(native);
		};

		loadNativeToken();
	}, []);

	useEffect(() => {
		if (token && tokens && tokens.length > 0) {
			const balance = balanceFrom(token);
			setTokenBalance(balance.toFixed(token.decimals));
		} else {
			setTokenBalance('0');
		}
	}, [tokens, token]);

	return {
		searchVisible,
		token,
		tokenBalance,
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
		tokens
	};
};

export default useWithdrawScreen;