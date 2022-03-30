import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { Gas, globalExchangeState } from '@stores/ExchangeStore';
import { globalWalletState } from '@stores/WalletStore';
import { createTransaction, ExchangeRoute, getExchangePrice } from '@models/token';
import { useAuthentication, useNavigation, useTheme } from '@hooks';
import Logger from '@utils/logger';
import { formatUnits } from 'ethers/lib/utils';
import { tokenBalanceFormat } from '@helpers/utilities';
import { approveSpending } from '@models/contract';
import { getProvider } from '@models/wallet';
import { BigNumber, Wallet } from 'ethers';
import { makeStyles } from './ExchangeResume.styles';

const useExchangeResumeScreen = () => {
	const exchange = useState(globalExchangeState());
	const wallet = useState(globalWalletState());
	const navigation = useNavigation();
	const { to, from, fromAmount, toAmount, lastConversion, gas = {} as Gas } = exchange.value;
	const [priceQuote, setPriceQuote] = React.useState<ExchangeRoute>();
	const [loading, setLoading] = React.useState(false); // creating transaction
	const [visible, setVisible] = React.useState(false);
	const [count, setCount] = React.useState(45);
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
	const [transactionHash, setTransactionHash] = React.useState('');
	const [error, setError] = React.useState('');
	const { colors } = useTheme();
	const { showAuthenticationPrompt } = useAuthentication();
	const styles = makeStyles(colors);

	const showModal = () => setVisible(true);
	const hideModal = () => {
		exchange.fromAmount.set(undefined);
		exchange.toAmount.set(undefined);
		exchange.gas.set(undefined);
		setVisible(false);
		navigation.navigate('WalletScreen');
	};

	const startCounter = useCallback(() => {
		setCount(45);
		setIntervalId(setInterval(() => setCount((c) => c - 1), 1000));
	}, []);

	const resetInterval = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	const loadPrices = async () => {
		if (!loading) {
			const { address: srcToken, decimals: srcDecimals } = from;
			const { address: destToken, decimals: destDecimals } = to;
			const { direction = 'from' } = lastConversion || {};
			const result = await getExchangePrice({
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				amount: (direction === 'to' ? toAmount : fromAmount) || '',
				side: direction === 'to' ? 'BUY' : 'SELL'
			});

			if (result.error) {
				Logger.error(result.error);
			} else {
				setPriceQuote(result);
			}
		}
	};

	useEffect(() => {
		resetInterval();
		loadPrices();
		startCounter();
	}, []);

	useEffect(() => {
		if (count === 0) {
			loadPrices();
		}
	}, [count]);

	useEffect(() => {
		setCount(45);
	}, [priceQuote]);

	const exchangeSummary = () => {
		let src = fromAmount || 1;
		let dest = toAmount || 1;
		if (priceQuote) {
			const { srcAmount, destAmount, srcDecimals, destDecimals } = priceQuote.priceRoute;
			src = formatUnits(srcAmount, srcDecimals);
			dest = formatUnits(destAmount, destDecimals);
		}

		if (fromAmount && toAmount) {
			return `${tokenBalanceFormat(+dest / +src, 9)} ${to.symbol} per ${from.symbol}`;
		}

		return null;
	};

	const exchangeName = priceQuote?.priceRoute.bestRoute[0].swaps[0].swapExchanges[0].exchange;

	const onSuccess = async () => {
		if (priceQuote?.priceRoute) {
			setLoading(true);
			setError('');
			showModal();
			const { priceRoute } = priceQuote;
			const {
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				srcAmount,
				destAmount,
				tokenTransferProxy: spender,
				side
			} = priceRoute;

			const { gweiValue = 30 } = exchange.gas.value || {};

			const { permit, approvalTransaction } = await approveSpending({
				userAddress: wallet.address.value,
				amount: srcAmount,
				privateKey: wallet.privateKey.value,
				contractAddress: srcToken,
				spender,
				gasPrice: +gweiValue * 1000000000
			});
			if (approvalTransaction) {
				await approvalTransaction.wait();
			}

			const result = await createTransaction({
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				srcAmount,
				destAmount,
				priceRoute,
				userAddress: wallet.value.address || '',
				permit,
				gasPrice: gweiValue ? +gweiValue * 1000000000 : undefined,
				side
			});

			if (result.error) {
				setLoading(false);
				setVisible(false);
				setError(result.error);
				Logger.error(result.error);
			} else if (wallet.value && gas) {
				const provider = await getProvider();
				const { chainId, data, from: src, gas: gasLimit, gasPrice, to: dest, value } = result;
				const nonce = await provider.getTransactionCount(wallet.value.address, 'latest');
				const txDefaults = {
					chainId,
					data,
					from: src,
					gasPrice: BigNumber.from(gasPrice),
					gasLimit: +gasLimit,
					nonce,
					to: dest,
					value: BigNumber.from(value)
				};
				const walletObject = new Wallet(wallet.privateKey.value, provider);
				const signedTx = await walletObject.signTransaction(txDefaults);
				const { hash } = await provider.sendTransaction(signedTx as string);
				setTransactionHash(hash);
			}
		}
	};
	return {
		styles,
		navigation,
		priceQuote,
		from,
		to,
		colors,
		loading,
		count,
		exchangeSummary,
		exchangeName,
		exchange,
		gas,
		visible,
		hideModal,
		transactionHash,
		error,
		setError,
		showAuthenticationPrompt,
		onSuccess
	};
};

export default useExchangeResumeScreen;
