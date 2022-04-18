import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { Gas, globalExchangeState } from '@stores/ExchangeStore';
import { globalWalletState } from '@stores/WalletStore';
import { createTransaction, ExchangeRoute, getExchangePrice } from '@models/token';
import { useBiconomy, useNavigation, useTheme, useTransactions } from '@hooks';
import Logger from '@utils/logger';
import { formatUnits } from 'ethers/lib/utils';
import { coinFromSymbol, tokenBalanceFormat } from '@helpers/utilities';
import { approveSpending } from '@models/contract';
import { getProvider } from '@models/wallet';
import { convertTransactionResponse } from '@models/transaction';
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
	const [fromFiatPrice, setFromFiatPrice] = React.useState<number>();
	const [toFiatPrice, setToFiatPrice] = React.useState<number>();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { addPendingTransaction } = useTransactions();
	const { gaslessEnabled } = useBiconomy();
	const gasless = gaslessEnabled && priceQuote && BigNumber.from(priceQuote.value).isZero();

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
				address: wallet.address.value,
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				amount: (direction === 'to' ? toAmount : fromAmount) || '',
				side: direction === 'to' ? 'BUY' : 'SELL',
				quote: true
			});

			if (result.message || result.reason) {
				Logger.error(result.message || result.reason);
			} else {
				setPriceQuote(result);
			}
		}
	};

	const loadFiatPrices = async () => {
		const { id: fromId } = await coinFromSymbol(from.symbol);
		const { id: toId } = await coinFromSymbol(to.symbol);

		const result = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${fromId},${toId}&vs_currencies=usd`
		);

		const quotes = await result.json();

		if (quotes[fromId]?.usd) {
			setFromFiatPrice(quotes[fromId].usd * +(fromAmount || 1));
		}

		if (quotes[toId]?.usd) {
			setToFiatPrice(quotes[toId].usd * +(toAmount || 1));
		}
	};

	useEffect(() => {
		resetInterval();
		loadPrices();
		loadFiatPrices();
		startCounter();
	}, []);

	useEffect(() => {
		if (count === 0) {
			loadPrices();
			loadFiatPrices();
		}
	}, [count]);

	useEffect(() => {
		setCount(45);
	}, [priceQuote]);

	const exchangeSummary = useCallback(() => {
		const { sellTokenToEthRate, buyTokenToEthRate } = priceQuote || {};
		if (sellTokenToEthRate && buyTokenToEthRate) {
			return `${tokenBalanceFormat(+buyTokenToEthRate / +sellTokenToEthRate, 9)} ${to.symbol} per ${from.symbol}`;
		}

		return null;
	}, [priceQuote, to, from]);

	const exchangeName = priceQuote?.orders[0].source;

	const onSuccess = async () => {
		if (priceQuote) {
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

			const { transaction: approvalTransaction } = await approveSpending({
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
				const transaction = await provider.sendTransaction(signedTx as string);
				const converted = convertTransactionResponse(
					transaction,
					to.symbol,
					formatUnits(destAmount, destDecimals),
					destDecimals
				);
				addPendingTransaction(converted);
				const { hash, wait } = transaction;
				setTransactionHash(hash);
				await wait();
				navigation.navigate('WalletScreen');
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
		onSuccess,
		fromFiatPrice,
		toFiatPrice,
		gasless
	};
};

export default useExchangeResumeScreen;
