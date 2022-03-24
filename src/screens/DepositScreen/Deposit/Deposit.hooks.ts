import React, { useEffect, useCallback } from 'react';
import { getProvider } from '@models/wallet';
import { NativeTokens, nativeTokens, ParaswapToken } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { aaveMarketTokenToParaswapToken, depositTransaction } from '@models/deposit';
import { useNavigation, useTokens, useAmplitude } from '@hooks';
import { network } from '@models/network';
import { Wallet } from 'ethers';
import { useState } from '@hookstate/core';

export const useDeposit = () => {
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { tokens } = useTokens();
	const { address, privateKey } = globalWalletState().value;
	const { market } = globalDepositState().value;
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [token] = React.useState<ParaswapToken>(aaveMarketTokenToParaswapToken(market));
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [amount, setAmount] = React.useState('0');
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');

	const balanceFrom = useCallback(
		(paraSwapToken: ParaswapToken | undefined): number => {
			if (!paraSwapToken) {
				return 0;
			}
			const walletToken = tokens?.find(
				(owned) => owned.symbol.toLowerCase() === paraSwapToken.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(+walletToken.balance - gasPrice, 0);
			}
			return walletToken ? +walletToken.balance : 0;
		},
		[tokens, nativeToken, gas]
	);

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas = nativeToken && balanceFrom(nativeToken) > 0;
	const canDeposit =
		token && +tokenBalance > 0 && +amount > 0 && +tokenBalance >= +amount && enoughForGas && gweiValue > 0;
	const onDeposit = async () => {
		if (canDeposit) {
			setWaitingTransaction(true);
			const transaction = await depositTransaction({
				address,
				amount,
				token: token.address,
				decimals: token.decimals,
				interestBearingToken: market.address,
				gweiValue
			});
			console.log('Deposit API', transaction);

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
			console.log('Deposit', txDefaults);
			const signedTx = await wallet.signTransaction(txDefaults);
			const { hash, wait } = await provider.sendTransaction(signedTx as string);
			if (hash) {
				console.log('Deposit', hash);
				await wait();
				setTransactionHash(hash);
				track('Deposited', {
					token: token.symbol,
					amount,
					hash
				});
				navigation.navigate('DepositSuccessScreen');
			} else {
				console.error('Error depositing');
			}
		}
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
		token,
		tokenBalance,
		updateAmount,
		canDeposit,
		onDeposit,
		waitingTransaction,
		transactionHash,
		nativeToken,
		enoughForGas,
		market
	};
};
