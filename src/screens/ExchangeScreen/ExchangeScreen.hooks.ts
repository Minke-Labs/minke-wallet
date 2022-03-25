/* eslint-disable no-console */
import React, { useEffect, createRef, useCallback } from 'react';
import * as Sentry from 'sentry-expo';
import { TextInput, Keyboard } from 'react-native';
import { useTokens, useNavigation } from '@hooks';
import { useState, State } from '@hookstate/core';
import { BigNumber, utils } from 'ethers';
import { ParaswapToken, Quote, getExchangePrice, nativeTokens, NativeTokens, ExchangeParams } from '@models/token';
import { network } from '@models/network';
import { ExchangeState, Conversion, globalExchangeState } from '@stores/ExchangeStore';

export const useExchangeScreen = () => {
	const navigation = useNavigation();
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [fromToken, setFromToken] = React.useState<ParaswapToken>({} as ParaswapToken);
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [fromTokenBalance, setFromTokenBalance] = React.useState('0');
	const [toTokenBalance, setToTokenBalance] = React.useState('0');
	const [searchSource, setSearchSource] = React.useState<'from' | 'to'>('from');
	const [showOnlyOwnedTokens, setShowOnlyOwnedTokens] = React.useState(true);
	const [quote, setQuote] = React.useState<Quote | null>();
	const [ownedTokens, setOwnedTokens] = React.useState<string[]>();
	const [fromConversionAmount, setFromConversionAmount] = React.useState<string | undefined>();
	const [toConversionAmount, setToConversionAmount] = React.useState<string | undefined>();
	const [lastConversion, setLastConversion] = React.useState<Conversion>();
	const fromAmountRef = createRef<TextInput>();
	const toAmountRef = createRef<TextInput>();

	const { tokens: walletTokens } = useTokens();

	const balanceFrom = useCallback(
		(token: ParaswapToken | undefined): number => {
			if (!token) {
				return 0;
			}
			const walletToken = walletTokens?.find(
				(owned) => owned.symbol.toLowerCase() === token.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const { gweiValue } = exchange.gas.value || {};
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(+walletToken.balance - gasPrice, 0);
			}
			return walletToken ? +walletToken.balance : 0;
		},
		[exchange.gas.value, walletTokens, nativeToken]
	);

	const updateFromToken = (token: ParaswapToken) => {
		setFromToken(token);
		setFromTokenBalance(balanceFrom(token).toFixed(token.decimals));
		setFromConversionAmount(undefined);
		exchange.from.set(token);
		exchange.fromAmount.set(undefined);
		// fromAmountRef.current?.focus();
	};

	const updateToToken = (token: ParaswapToken) => {
		setToToken(token);
		setToConversionAmount(undefined);
		exchange.to.set(token);
		exchange.toAmount.set(undefined);
		// toAmountRef.current?.focus();
	};

	interface PriceParams {
		amount?: string;
		side?: ExchangeParams['side'];
	}

	const loadPrices = async ({ amount = '1', side = 'SELL' }: PriceParams): Promise<Quote | undefined> => {
		if (fromToken && toToken) {
			setLoadingPrices(true);
			const { address: srcToken, decimals: srcDecimals } = fromToken;
			const { address: destToken, decimals: destDecimals } = toToken;
			const {
				error,
				priceRoute: { srcAmount, destAmount }
			} = await getExchangePrice({ srcToken, srcDecimals, destToken, destDecimals, amount, side });
			if (error) {
				Sentry.Native.captureException(error); // ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT
				Keyboard.dismiss();
				setQuote(undefined);
				setLoadingPrices(false);
				return undefined;
			}

			const newQuote = {
				from: { [fromToken.symbol]: BigNumber.from(srcAmount) },
				to: { [toToken?.symbol || '']: BigNumber.from(destAmount) }
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
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
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
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			const newQuote = await loadPrices({ amount: formatedValue, side: 'BUY' });
			setQuote(newQuote);
			if (newQuote) {
				setQuote(newQuote);
				const converted = newQuote.from[fromToken?.symbol || ''];
				const convertedAmount = utils.formatUnits(converted, fromToken.decimals);
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

	const onTokenSelect = (token: ParaswapToken) => {
		hideModal();
		setQuote(null);
		if (searchSource === 'from') {
			updateFromToken(token);
		} else {
			updateToToken(token);
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
			updateFromToken(toToken || ({} as ParaswapToken));
			updateToToken(backup);
		}
	};

	useEffect(() => {
		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setFromToken(native);
			setNativeToken(native);
		};

		exchange.set({} as ExchangeState);
		loadNativeToken();
	}, []);

	useEffect(() => {
		if (walletTokens) {
			setOwnedTokens(walletTokens.map(({ symbol }) => symbol.toLowerCase()));
		}
	}, [walletTokens]);

	useEffect(() => {
		setFromTokenBalance(balanceFrom(fromToken).toFixed(fromToken.decimals));
		setToTokenBalance(balanceFrom(toToken).toFixed(toToken?.decimals));
	}, [ownedTokens, exchange.gas.value]);

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

	const enoughForGas = nativeToken && balanceFrom(nativeToken) > 0;

	const canSwap = () =>
		quote &&
		fromToken &&
		toToken &&
		exchange.value.fromAmount &&
		exchange.value.toAmount &&
		+(exchange.value.fromAmount || 0) > 0 &&
		balanceFrom(fromToken) >= +(exchange.value.fromAmount || 0) &&
		!loadingPrices &&
		enoughForGas;

	return {
		fromToken,
		toToken,
		fromTokenBalance,
		toTokenBalance,
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
		fromAmountRef,
		toAmountRef,
		updateFromQuotes,
		updateToQuotes,
		enoughForGas,
		ownedTokens,
		quote
	};
};
