import React, { useEffect, useCallback } from 'react';
import { getProvider } from '@models/wallet';
import { ParaswapToken } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { aaveMarketTokenToParaswapToken, depositTransaction } from '@models/deposit';
import { useNavigation, useTokens, useAmplitude, useBiconomy, useNativeToken } from '@hooks';
import { Wallet } from 'ethers';
import { useState } from '@hookstate/core';
import { Keyboard } from 'react-native';
import Logger from '@utils/logger';
import { aaveDepositContract, gaslessDeposit } from '@models/gaslessTransaction';
import { toBn } from 'evm-bn';
import { formatUnits } from 'ethers/lib/utils';

export const useDeposit = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { nativeToken } = useNativeToken();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { tokens } = useTokens();
	const { address, privateKey } = globalWalletState().value;
	const { market } = globalDepositState().value;
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
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
		if (!formatedValue || (!formatedValue.endsWith('.') && !formatedValue.startsWith('.'))) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas = gaslessEnabled || (nativeToken && balanceFrom(nativeToken) > 0);
	const canDeposit =
		token &&
		+tokenBalance > 0 &&
		+amount > 0 &&
		+tokenBalance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || gweiValue > 0); // if gasless we dont need a gwei value

	const onDeposit = async () => {
		Keyboard.dismiss();
		if (canDeposit) {
			setWaitingTransaction(true);

			if (gaslessEnabled) {
				const hash = await gaslessDeposit({
					address,
					privateKey,
					amount: formatUnits(toBn(amount, token.decimals), 'wei'),
					minAmount: formatUnits(toBn((Number(amount) * 0.97).toString(), token.decimals), 'wei'),
					biconomy,
					depositContract: aaveDepositContract,
					gasPrice: gweiValue.toString(),
					interestBearingToken: market.address,
					token: token.address
				});
				if (hash) {
					Logger.log(`Gasless deposit ${JSON.stringify(hash)}`);
					setTransactionHash(hash);
					track('Deposited', {
						token: token.symbol,
						amount,
						hash,
						gasless: true
					});
					await biconomy.getEthersProvider().waitForTransaction(hash);
					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' });
				} else {
					Logger.error('Error depositing');
				}
			} else {
				const transaction = await depositTransaction({
					address,
					amount,
					token: token.address,
					decimals: token.decimals,
					interestBearingToken: market.address,
					gweiValue
				});
				Logger.log(`Deposit API ${JSON.stringify(transaction)}`);

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
				Logger.log(`Deposit ${JSON.stringify(txDefaults)}`);
				const signedTx = await wallet.signTransaction(txDefaults);
				const { hash, wait } = await provider.sendTransaction(signedTx as string);
				if (hash) {
					Logger.log(`Deposit ${JSON.stringify(hash)}`);
					await wait();
					setTransactionHash(hash);
					track('Deposited', {
						token: token.symbol,
						amount,
						hash,
						gasless: false
					});
					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' });
				} else {
					Logger.error('Error depositing');
				}
			}
		}
	};

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
		market,
		gaslessEnabled
	};
};
