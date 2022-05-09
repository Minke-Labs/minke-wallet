import React, { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeToken, ParaswapToken } from '@models/token';
import { globalExchangeState } from '@stores/ExchangeStore';
import {
	useAmplitude,
	useNavigation,
	useTokens,
	useNativeToken,
	useBiconomy,
	useTransactions,
	useDeposit
} from '@hooks';
import Logger from '@utils/logger';
import { getProvider } from '@models/wallet';
import { Wallet } from 'ethers';
import { globalWalletState } from '@stores/WalletStore';
import { withdrawTransaction } from '@models/withdraw';
import { aaveDepositContract, gaslessWithdraw } from '@models/gaslessTransaction';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';

const useWithdrawScreen = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { nativeToken } = useNativeToken();
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [token, setToken] = React.useState<MinkeToken>();
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [amount, setAmount] = React.useState('0');
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const { interestTokens: tokens, tokens: balances } = useTokens();
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const navigation = useNavigation();
	const { track } = useAmplitude();
	const { addPendingTransaction } = useTransactions();
	const { address, privateKey } = globalWalletState().value;
	const { defaultToken } = useDeposit(true);

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

	const onTokenSelect = (selectedToken: MinkeToken) => {
		hideModal();
		setToken(selectedToken);
	};

	const enoughForGas = gaslessEnabled || (nativeToken && balanceFrom(nativeToken, true) > 0);
	const canWithdraw =
		token &&
		+tokenBalance > 0 &&
		+amount > 0 &&
		+tokenBalance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || gweiValue > 0);

	const onWithdraw = async () => {
		Keyboard.dismiss();
		if (canWithdraw && token) {
			setWaitingTransaction(true);
			if (gaslessEnabled) {
				const hash = await gaslessWithdraw({
					address,
					privateKey,
					amount: formatUnits(toBn(amount, token.decimals), 'wei'),
					minAmount: formatUnits(toBn((Number(amount) * 0.97).toString(), token.decimals), 'wei'),
					depositContract: aaveDepositContract,
					gasPrice: gweiValue.toString(),
					interestBearingToken: token.interestBearingAddress!,
					token: token.address,
					biconomy
				});

				if (hash) {
					Logger.log(`Withdraw gasless ${JSON.stringify(hash)}`);
					setTransactionHash(hash);
					track('Withdraw done', {
						token: token.symbol,
						amount,
						hash,
						gasless: true
					});

					const { from, to } = await biconomy.getEthersProvider().waitForTransaction(hash);
					addPendingTransaction({
						from,
						destination: to,
						hash,
						txSuccessful: true,
						pending: true,
						timeStamp: (new Date().getTime() / 1000).toString(),
						amount,
						direction: 'exchange',
						symbol: token.symbol,
						subTransactions: [
							{ type: 'incoming', symbol: token.symbol, amount: +amount },
							{ type: 'outgoing', symbol: token.interestBearingSymbol!, amount: +amount }
						]
					});

					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'withdrawal' });
				} else {
					Logger.error('Error withdrawing');
				}
			} else {
				const transaction = await withdrawTransaction({
					address,
					privateKey,
					amount,
					toTokenAddress: token.address,
					decimals: token.decimals,
					interestBearingToken: token.interestBearingAddress!,
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
				const tx = await provider.sendTransaction(signedTx as string);
				const { hash, wait } = tx;
				addPendingTransaction({
					from,
					destination: to,
					hash,
					txSuccessful: true,
					pending: true,
					timeStamp: (new Date().getTime() / 1000).toString(),
					amount,
					direction: 'exchange',
					symbol: token.symbol,
					subTransactions: [
						{ type: 'incoming', symbol: token.symbol, amount: +amount },
						{ type: 'outgoing', symbol: token.interestBearingSymbol!, amount: +amount }
					]
				});

				if (hash) {
					Logger.log(`Withdraw ${JSON.stringify(hash)}`);
					await wait();
					setTransactionHash(hash);
					track('Withdraw done', {
						token: token.symbol,
						amount,
						hash,
						gasless: false
					});
					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'withdrawal' });
				} else {
					Logger.error('Error withdrawing');
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

	useEffect(() => {
		if (!!defaultToken && !token) {
			setToken(defaultToken);
		}
	}, [defaultToken]);

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
		tokens,
		gaslessEnabled
	};
};

export default useWithdrawScreen;
