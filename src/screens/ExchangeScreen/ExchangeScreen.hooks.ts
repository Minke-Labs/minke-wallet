import React, { useEffect } from 'react';
import Logger from '@utils/logger';
import { Keyboard } from 'react-native';
import { useTokens, useNavigation, useNativeToken, useBiconomy, useDepositProtocols, useLanguage } from '@hooks';
import { useState, State } from '@hookstate/core';
import { BigNumber, constants, utils } from 'ethers';
import { Quote, getExchangePrice, ExchangeParams } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import { ExchangeState, Conversion, globalExchangeState } from '@stores/ExchangeStore';
import { globalWalletState, WalletState } from '@stores/WalletStore';
import { isExchangeGasless, validatedExceptions } from '@models/exchange';
import { formatUnits } from 'ethers/lib/utils';

interface PriceParams {
	amount?: string;
	side?: ExchangeParams['side'];
}

interface UseExchangeScreenParams {
	sourceToken?: MinkeToken;
	destToken?: MinkeToken;
}

export const useExchangeScreen = ({ sourceToken, destToken }: UseExchangeScreenParams) => {
	const { nativeToken, balance } = useNativeToken();
	const navigation = useNavigation();
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const wallet: State<WalletState> = useState(globalWalletState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [fromToken, setFromToken] = React.useState<MinkeToken>(sourceToken as MinkeToken);
	const [toToken, setToToken] = React.useState<MinkeToken>(destToken as MinkeToken);
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [gasless, setGasless] = React.useState(true);
	const [searchSource, setSearchSource] = React.useState<'from' | 'to'>('from');
	const [showOnlyOwnedTokens, setShowOnlyOwnedTokens] = React.useState(true);
	const [quote, setQuote] = React.useState<Quote | null>();
	const [ownedTokens, setOwnedTokens] = React.useState<string[]>();
	const [error, setError] = React.useState('');
	const [fromConversionAmount, setFromConversionAmount] = React.useState<string | undefined>();
	const [toConversionAmount, setToConversionAmount] = React.useState<string | undefined>();
	const [lastConversion, setLastConversion] = React.useState<Conversion>();
	const { gaslessEnabled } = useBiconomy();
	const { accountBalance } = useTokens();
	const { tokens: walletTokens } = accountBalance;
	const { defaultToken } = useDepositProtocols();
	const { i18n } = useLanguage();
	const { maxFeePerGas = constants.Zero } = exchange.gas.value || {};

	const updateFromToken = (token: MinkeToken) => {
		setFromToken(token);
		setFromConversionAmount(undefined);
		exchange.from.set(token);
		exchange.fromAmount.set(undefined);
	};

	const updateToToken = (token: MinkeToken) => {
		setToToken(token);
		setToConversionAmount(undefined);
		exchange.to.set(token);
		exchange.toAmount.set(undefined);
	};

	const loadPrices = async ({ amount = '1', side = 'SELL' }: PriceParams): Promise<Quote | undefined> => {
		if (fromToken && toToken) {
			setLoadingPrices(true);
			const { address: srcToken, decimals: srcDecimals } = fromToken;
			const { address: destinationToken, decimals: destDecimals } = toToken;
			const {
				reason,
				message,
				buyAmount,
				sellAmount,
				sellTokenAddress,
				value,
				allowanceTarget,
				to,
				validationErrors = []
			} = await getExchangePrice({
				address: wallet.address.value,
				srcToken,
				destToken: destinationToken,
				srcDecimals,
				destDecimals,
				amount,
				side
			});

			if (message || reason) {
				Logger.error(`Load prices error: ${message || reason}`);
				Keyboard.dismiss();
				setQuote(undefined);
				setLoadingPrices(false);
				const validationError = validationErrors[0];
				const { reason: errorReason } = validationError;
				if (validationError && errorReason && validatedExceptions.includes(errorReason)) {
					setError(i18n.t(`ExchangeScreen.validations.${errorReason}`));
				} else {
					setError(message || reason || '');
				}
				return undefined;
			}

			const newQuote = {
				from: { [fromToken.symbol]: BigNumber.from(sellAmount) },
				to: { [toToken?.symbol || '']: BigNumber.from(buyAmount) },
				gasless: await isExchangeGasless(value, sellTokenAddress, to || allowanceTarget)
			};
			setQuote(newQuote);
			setLoadingPrices(false);
			return newQuote;
		}
		setLoadingPrices(false);
		return undefined;
	};

	const updateFromQuotes = async (amount: string) => {
		const formatedValue = amount.replace(/,/g, '.');
		if (
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			const newQuote = await loadPrices({ amount: formatedValue, side: 'SELL' });
			setQuote(newQuote);
			if (newQuote) {
				const converted = newQuote.to[toToken?.symbol || ''];
				const convertedAmount = utils.formatUnits(converted, toToken?.decimals);
				exchange.toAmount.set(convertedAmount);
				setToConversionAmount(convertedAmount);
				setFromConversionAmount(formatedValue);
			}
			setLastConversion({ direction: 'from', amount: formatedValue });
			exchange.fromAmount.set(formatedValue);
		}
	};

	const updateToQuotes = async (amount: string) => {
		const formatedValue = amount.replace(/,/g, '.');
		if (
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			const newQuote = await loadPrices({ amount: formatedValue, side: 'BUY' });
			setQuote(newQuote);
			if (newQuote) {
				setQuote(newQuote);
				const converted = newQuote.from[fromToken?.symbol || ''];
				const convertedAmount = utils.formatUnits(converted, fromToken!.decimals);
				exchange.fromAmount.set(convertedAmount);
				setFromConversionAmount(convertedAmount);
				setToConversionAmount(formatedValue);
			}
			setLastConversion({ direction: 'to', amount: formatedValue });
			exchange.toAmount.set(formatedValue);
		}
	};

	const goToExchangeResume = () => {
		if (fromToken && toToken) {
			exchange.merge({ from: fromToken, to: toToken, lastConversion });
			navigation.navigate('ExchangeResumeScreen');
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

	const showModalFrom = (): void => {
		setShowOnlyOwnedTokens(true);
		setSearchSource('from');
		showModal();
	};

	const showModalTo = (): void => {
		setShowOnlyOwnedTokens(false);
		setSearchSource('to');
		showModal();
	};

	const onTokenSelect = (token: MinkeToken) => {
		hideModal();
		setQuote(null);
		let walletToken = token;
		if (!token.balance) {
			walletToken =
				(walletTokens || []).find(({ address }) => address.toLowerCase() === token.address.toLowerCase()) ||
				token;
		}
		if (searchSource === 'from') {
			updateFromToken(walletToken);
		} else {
			updateToToken(walletToken);
		}
	};

	const canChangeDirections =
		!loadingPrices && fromToken && toToken && ownedTokens?.includes(toToken.symbol.toLowerCase());

	const directionSwap = () => {
		if (canChangeDirections) {
			if (lastConversion) {
				const { amount, direction } = lastConversion;
				setLastConversion({ amount, direction: direction === 'from' ? 'to' : 'from' });
			}
			exchange.merge({
				from: undefined,
				to: undefined,
				fromAmount: undefined,
				toAmount: undefined,
				lastConversion: undefined
			});
			const backup = fromToken;
			updateFromToken(toToken || ({} as MinkeToken));
			updateToToken(backup!);
		}
	};

	useEffect(() => {
		if (walletTokens) {
			setOwnedTokens(walletTokens.map(({ symbol }) => symbol.toLowerCase()));
		}
	}, [walletTokens]);

	useEffect(() => {
		exchange.set({} as ExchangeState);
	}, []);

	useEffect(() => {
		if (destToken && nativeToken) {
			setFromToken(nativeToken);
		} else if (!!defaultToken && !fromToken) {
			setFromToken(defaultToken);
		} else if (defaultToken === null) {
			setFromToken(nativeToken as MinkeToken);
		}
	}, [defaultToken]);

	useEffect(() => {
		if (fromToken && toToken) {
			if (lastConversion) {
				const { direction, amount } = lastConversion;
				if (direction === 'from') {
					updateFromQuotes(amount);
				} else {
					updateToQuotes(amount);
				}
			} else {
				loadPrices({});
			}
		}
	}, [toToken, fromToken]);

	useEffect(() => {
		setGasless(gaslessEnabled && (quote ? quote.gasless : true));
	}, [gaslessEnabled, quote]);

	useEffect(() => {
		if (!gasless && fromToken && nativeToken && maxFeePerGas && !!fromToken.balance && +fromToken.balance > 0) {
			const isNativeToken = fromToken.symbol === nativeToken.symbol;
			if (isNativeToken) {
				const transactionPrice = maxFeePerGas.mul(300000); // gas price * gas limit
				const gasValueInEth = formatUnits(transactionPrice);
				const newBalance = +fromToken.balance - +gasValueInEth;
				fromToken.balanceUSD = (newBalance * fromToken.balanceUSD!) / +fromToken.balance;
				fromToken.balance = String(newBalance);
				setFromToken(fromToken);
			}
		}
	}, [maxFeePerGas, fromToken, nativeToken]);

	// @TODO: multiply by the gas usage of the blockchain transaction
	const enoughForGas = gasless || (balance && maxFeePerGas ? balance.gte(maxFeePerGas) : true);

	const canSwap = () =>
		quote &&
		fromToken &&
		fromToken.balance &&
		toToken &&
		exchange.value.fromAmount &&
		exchange.value.toAmount &&
		+(exchange.value.fromAmount || 0) > 0 &&
		+fromToken.balance >= +(exchange.value.fromAmount || 0) &&
		!loadingPrices &&
		enoughForGas;

	return {
		fromToken,
		toToken,
		fromConversionAmount,
		toConversionAmount,
		canChangeDirections,
		directionSwap,
		showModalFrom,
		showModalTo,
		hideModal,
		onTokenSelect,
		goToExchangeResume,
		canSwap,
		loadingPrices,
		searchVisible,
		showOnlyOwnedTokens,
		updateFromQuotes,
		updateToQuotes,
		enoughForGas,
		ownedTokens: walletTokens,
		quote,
		error,
		setError,
		gasless
	};
};
