import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { Gas, globalExchangeState } from '@stores/ExchangeStore';
import { globalWalletState } from '@stores/WalletStore';
import { ExchangeRoute, getExchangePrice } from '@models/token';
import { useAmplitude, useBiconomy, useNavigation, useTransactions, useWalletManagement } from '@hooks';
import Logger from '@utils/logger';
import { searchCoinData, tokenBalanceFormat } from '@helpers/utilities';
import { getProvider } from '@models/wallet';
import { convertTransactionResponse } from '@models/transaction';
import { BigNumber, Wallet } from 'ethers';
import { approvalState } from '@models/deposit';
import { exchangeContract, gaslessApproval, gaslessExchange } from '@models/gaslessTransaction';
import { captureException } from '@sentry/react-native';
import { isExchangeGasless } from '@models/exchange';
import gasLimits from '@models/gas';
import ApprovalService from '@src/services/approval/ApprovalService';
import { toBn } from 'evm-bn';
import { networks } from '@models/network';

const useExchangeResumeScreen = () => {
	const exchange = useState(globalExchangeState());
	const wallet = useState(globalWalletState());
	const {
		network: { coingeckoPlatform }
	} = wallet.value;
	const navigation = useNavigation();
	const { to, from, fromAmount, toAmount, lastConversion, gas = {} as Gas } = exchange.value;
	const [priceQuote, setPriceQuote] = React.useState<ExchangeRoute>();
	const [blockchainError, setBlockchainError] = React.useState(false);
	const [loading, setLoading] = React.useState(false); // creating transaction
	const [visible, setVisible] = React.useState(false);
	const [gasless, setGasless] = React.useState(false);
	const [count, setCount] = React.useState(45);
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
	const [transactionHash, setTransactionHash] = React.useState('');
	const [error, setError] = React.useState('');
	const [fromFiatPrice, setFromFiatPrice] = React.useState<number>();
	const [toFiatPrice, setToFiatPrice] = React.useState<number>();
	const { addPendingTransaction } = useTransactions();
	const { track } = useAmplitude();
	const { gaslessEnabled, biconomy } = useBiconomy();
	const { canSendTransactions, walletConnect, connector } = useWalletManagement();

	const showModal = () => setVisible(true);
	const hideModal = () => {
		exchange.fromAmount.set(undefined);
		exchange.toAmount.set(undefined);
		exchange.gas.set(undefined);
		setVisible(false);
		navigation.navigate('HomeScreen');
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
			const { decimals: srcDecimals, address: srcToken } = from;
			const { decimals: destDecimals, address: destToken } = to;
			const { direction = 'from' } = lastConversion || {};
			const result = await getExchangePrice({
				address: wallet.address.value,
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				amount: (direction === 'to' ? toAmount : fromAmount) || '',
				side: direction === 'to' ? 'BUY' : 'SELL',
				quote: true,
				chainId: from.chainId,
				slippage: exchange.slippage.value
			});

			if (result.message || result.reason) {
				Logger.error(result.message || result.reason);
			} else {
				setPriceQuote(result);
			}
		}
	};

	const loadFiatPrices = async () => {
		const fromId = from.id || (await searchCoinData(from.address, coingeckoPlatform, from.symbol, from.id)).id;
		const toId = to.id || (await searchCoinData(to.address, coingeckoPlatform, to.symbol, to.id)).id;

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

	const onBlockchainError = (e: any) => {
		Logger.sentry('Exchange resume blockchain error', e);
		captureException(e);
		setVisible(false);
		setBlockchainError(true);
		setLoading(false);
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

	useEffect(() => {
		const fetchGasless = async () => {
			setGasless(
				gaslessEnabled &&
					(priceQuote
						? await isExchangeGasless(priceQuote.value, priceQuote.sellTokenAddress, priceQuote.to!)
						: true)
			);
		};

		fetchGasless();
	}, [gaslessEnabled, priceQuote]);

	const exchangeSummary = useCallback(() => {
		const { sellTokenToEthRate, buyTokenToEthRate } = priceQuote || {};
		if (sellTokenToEthRate && buyTokenToEthRate) {
			return `${tokenBalanceFormat(+buyTokenToEthRate / +sellTokenToEthRate, 9)} ${to.symbol} per ${from.symbol}`;
		}

		return null;
	}, [priceQuote, to, from]);

	const exchangeName = priceQuote?.orders[0].source;

	const onSuccess = async () => {
		if (priceQuote && canSendTransactions) {
			setLoading(true);
			setError('');
			showModal(); // Waiting modal.
			try {
				const {
					allowanceTarget,
					sellTokenAddress,
					sellAmount,
					buyAmount,
					buyTokenAddress,
					gasPrice,
					gas: gasLimit,
					to: toAddress,
					value,
					data,
					chainId
				} = priceQuote;

				const { address, privateKey } = wallet.value;
				const network = Object.values(networks).find((n) => n.chainId === chainId);
				const { id: networkId } = network;

				if (gasless) {
					const { isApproved } = await approvalState(address, sellTokenAddress, exchangeContract, networkId);
					const provider = biconomy.getEthersProvider();

					if (!isApproved) {
						const tx = await gaslessApproval({
							address,
							biconomy,
							contract: sellTokenAddress,
							privateKey: privateKey!,
							spender: exchangeContract
						});

						track('Approved for exchange', { to: to.symbol, from: from.symbol, gasless: true });
						await provider.waitForTransaction(tx);
					}

					const hash = await gaslessExchange({
						address,
						amount: sellAmount,
						minAmount: buyAmount,
						biconomy,
						depositContract: exchangeContract,
						gasPrice,
						privateKey: privateKey!,
						swapData: data,
						token: sellTokenAddress,
						toToken: buyTokenAddress,
						swapTarget: toAddress!
					});
					setTransactionHash(hash);
					track('Exchanged', { to: to.symbol, from: from.symbol, gasless: true, hash });
					addPendingTransaction({
						from: from.address,
						destination: address,
						hash,
						txSuccessful: true,
						pending: true,
						timeStamp: (new Date().getTime() / 1000).toString(),
						amount: toAmount!,
						direction: 'exchange',
						symbol: to.symbol,
						subTransactions: [
							{ type: 'outgoing', symbol: from.symbol, amount: +fromAmount! },
							{ type: 'incoming', symbol: to.symbol, amount: +toAmount! }
						]
					});

					navigation.navigate('HomeScreen');
				} else {
					const { isApproved } = await approvalState(address, sellTokenAddress, allowanceTarget, networkId);

					if (!isApproved) {
						await new ApprovalService().approve({
							address,
							biconomy,
							connector,
							contract: sellTokenAddress,
							gasless,
							privateKey,
							spender: allowanceTarget,
							walletConnect,
							network
						});
					}

					const provider = getProvider(network.id);
					const nonce = await provider.getTransactionCount(address, 'latest');
					const txDefaults = {
						chainId,
						data,
						gasPrice: BigNumber.from(gasPrice),
						gasLimit: Math.max(
							to.suggestedSlippage ? gasLimits.exchange * 1.5 : gasLimits.exchange,
							+gasLimit
						),
						nonce,
						to: toAddress,
						value: BigNumber.from(value)
					};
					let hash = '';

					if (walletConnect) {
						const { value: transactionValue, to: addressTo } = txDefaults;
						hash = await connector.sendTransaction({
							from: address,
							to: addressTo,
							value: (transactionValue || toBn('0')).toHexString(),
							data: data || toBn('0').toHexString(),
							gasLimit: gasLimits.exchange.toString()
						});

						addPendingTransaction({
							hash,
							txSuccessful: true,
							pending: true,
							timeStamp: (new Date().getTime() / 1000).toString(),
							amount: toAmount!,
							direction: 'exchange',
							symbol: to.symbol,
							subTransactions: [
								{ type: 'outgoing', symbol: from.symbol, amount: +fromAmount! },
								{ type: 'incoming', symbol: to.symbol, amount: +toAmount! }
							],
							destination: addressTo!,
							from: address
						});
					} else {
						const walletObject = new Wallet(wallet.privateKey.value!, provider);
						const signedTx = await walletObject.signTransaction(txDefaults);
						const transaction = await provider.sendTransaction(signedTx as string);
						const converted = convertTransactionResponse({
							transaction,
							amount: toAmount!,
							direction: 'exchange',
							symbol: to.symbol,
							subTransactions: [
								{ type: 'outgoing', symbol: from.symbol, amount: +fromAmount! },
								{ type: 'incoming', symbol: to.symbol, amount: +toAmount! }
							]
						});
						addPendingTransaction(converted);
						hash = transaction.hash;
					}
					track('Exchanged', { to: to.symbol, from: from.symbol, gasless: false, hash });
					setTransactionHash(hash);
					navigation.navigate('HomeScreen');
				}
			} catch (e) {
				onBlockchainError(e);
			}
		}
	};

	return {
		priceQuote,
		from,
		to,
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
		gasless,
		blockchainError,
		setBlockchainError
	};
};

export default useExchangeResumeScreen;
