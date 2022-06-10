import React, { useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useTokens, useNavigation, useNativeToken, useBiconomy, useDepositProtocols } from '@hooks';
import { useState, State } from '@hookstate/core';
import { BigNumber, utils } from 'ethers';
import { ParaswapToken, Quote, getExchangePrice, ExchangeParams } from '@models/token';
import { ExchangeState, Conversion, globalExchangeState } from '@stores/ExchangeStore';
import Logger from '@utils/logger';
import { globalWalletState, WalletState } from '@stores/WalletStore';
import { isExchangeTargetApproved } from '@models/gaslessTransaction';

export const useExchangeScreen = () => {
	const { nativeToken } = useNativeToken();
	const navigation = useNavigation();
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const wallet: State<WalletState> = useState(globalWalletState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [fromToken, setFromToken] = React.useState<ParaswapToken>();
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [gasless, setGasless] = React.useState(true);
	const [fromTokenBalance, setFromTokenBalance] = React.useState('0');
	const [toTokenBalance, setToTokenBalance] = React.useState('0');
	const [searchSource, setSearchSource] = React.useState<'from' | 'to'>('from');
	const [showOnlyOwnedTokens, setShowOnlyOwnedTokens] = React.useState(true);
	const [quote, setQuote] = React.useState<Quote | null>();
	const [ownedTokens, setOwnedTokens] = React.useState<string[]>();
	const [error, setError] = React.useState('');
	const [fromConversionAmount, setFromConversionAmount] = React.useState<string | undefined>();
	const [toConversionAmount, setToConversionAmount] = React.useState<string | undefined>();
	const [lastConversion, setLastConversion] = React.useState<Conversion>();
	const { gaslessEnabled } = useBiconomy();
	const { tokens: walletTokens } = useTokens();
	const { defaultToken } = useDepositProtocols();

	const balanceFrom = useCallback(
		(token: ParaswapToken | undefined): string => {
			if (!token) {
				return '0';
			}
			const walletToken = walletTokens?.find(
				(owned) => owned.symbol.toLowerCase() === token.symbol.toLowerCase()
			);

			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken && !gasless) {
				const { gweiValue } = exchange.gas.value || {};
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(+walletToken.balance - gasPrice, 0).toString();
			}

			return walletToken?.balance || '0';
		},
		[exchange.gas.value, walletTokens, nativeToken]
	);

	const updateFromToken = (token: ParaswapToken) => {
		setFromToken(token);
		setFromTokenBalance(balanceFrom(token));
		setFromConversionAmount(undefined);
		exchange.from.set(token);
		exchange.fromAmount.set(undefined);
	};

	const updateToToken = (token: ParaswapToken) => {
		setToToken(token);
		setToConversionAmount(undefined);
		exchange.to.set(token);
		exchange.toAmount.set(undefined);
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
			const { reason, message, buyAmount, sellAmount, value, allowanceTarget, to } = await getExchangePrice({
				address: wallet.address.value,
				srcToken,
				destToken,
				srcDecimals,
				destDecimals,
				amount,
				side
			});

			if (message || reason) {
				Logger.error(`Load prices error: ${message || reason}`); // ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT
				Keyboard.dismiss();
				setQuote(undefined);
				setLoadingPrices(false);
				setError(message || reason || '');
				return undefined;
			}

			const newQuote = {
				from: { [fromToken.symbol]: BigNumber.from(sellAmount) },
				to: { [toToken?.symbol || '']: BigNumber.from(buyAmount) },
				gasless: BigNumber.from(value).isZero() && (await isExchangeTargetApproved(to || allowanceTarget))
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
		if (walletTokens) {
			setOwnedTokens(walletTokens.map(({ symbol }) => symbol.toLowerCase()));
		}
	}, [walletTokens]);

	useEffect(() => {
		setFromTokenBalance(balanceFrom(fromToken));
		setToTokenBalance(balanceFrom(toToken));
	}, [ownedTokens, exchange.gas.value]);

	useEffect(() => {
		exchange.set({} as ExchangeState);
	}, []);

	useEffect(() => {
		if (!!defaultToken && !fromToken) {
			setFromToken(defaultToken);
		} else if (defaultToken === null) {
			setFromToken(nativeToken);
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

	const enoughForGas = gasless || (nativeToken && +balanceFrom(nativeToken) > 0);

	const canSwap = () =>
		quote &&
		fromToken &&
		toToken &&
		exchange.value.fromAmount &&
		exchange.value.toAmount &&
		+(exchange.value.fromAmount || 0) > 0 &&
		+balanceFrom(fromToken) >= +(exchange.value.fromAmount || 0) &&
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
		updateFromQuotes,
		updateToQuotes,
		enoughForGas,
		ownedTokens,
		quote,
		error,
		setError,
		gasless
	};
};
