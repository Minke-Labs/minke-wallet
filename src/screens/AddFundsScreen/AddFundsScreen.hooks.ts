import React, { useEffect } from 'react';
import { Currency } from '@models/types/currency.types';
import { useAmplitude, useCountry, useCurrencies, useLanguage, useNavigation, useWyreApplePay } from '@hooks';
import { countries } from '@styles';
import { getWalletOrderQuotation } from '@models/wyre';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';
import { Keyboard, Platform } from 'react-native';

const useAddFundsScreen = () => {
	const { address, network } = useState(globalWalletState()).value;
	const { topUpTokens } = network;
	const [currency, setCurrency] = React.useState<Currency>();
	const [token, setToken] = React.useState<MinkeToken>();
	const [currencySearchVisible, setCurrencySearchVisible] = React.useState(false);
	const [tokenSearchVisible, setTokenSearchVisible] = React.useState(false);
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [tokenAmount, setTokenAmount] = React.useState<string | undefined>();
	const [fiatAmount, setFiatAmount] = React.useState<string | undefined>();
	const [fiat, setFiat] = React.useState(true);
	const [error, setError] = React.useState('');
	const { currencies, providers } = useCurrencies();
	const { country } = useCountry();
	const { i18n } = useLanguage();
	const isWyreCurrency = currency && providers.wyre.includes(currency);
	const showApplePay = isWyreCurrency && Platform.OS === 'ios';
	const navigation = useNavigation();
	const { onPurchase, orderId, error: applePayError } = useWyreApplePay();
	const { track } = useAmplitude();

	const addError = (err: string) => {
		Keyboard.dismiss();
		setError(err);
	};

	const onApplePayPurchase = () => {
		Keyboard.dismiss();
		const value = fiat ? +fiatAmount! : +tokenAmount!;
		track('Started Apple Pay Payment', { currency: currency!.code, value });
		const { country: currencyCountry, code } = currency!;
		onPurchase({
			sourceCurrency: code,
			destCurrency: token!.symbol,
			value,
			fiat,
			country: currencyCountry
		});
	};

	const dismissCurrencySearch = () => setCurrencySearchVisible(false);
	const openTokenSearch = () => {
		dismissCurrencySearch();
		Keyboard.dismiss();
		setTokenSearchVisible(true);
	};
	const dismissTokenSearch = () => setTokenSearchVisible(false);
	const openCurrencySearch = () => {
		dismissTokenSearch();
		Keyboard.dismiss();
		setCurrencySearchVisible(true);
	};

	const selectCurrency = (c: Currency) => {
		setCurrency(c);
		dismissCurrencySearch();
	};

	const selectToken = (t: MinkeToken) => {
		setToken(t);
		dismissTokenSearch();
	};

	const updateFiat = async (amount: string) => {
		setFiat(true);
		const formatedValue = amount.replace(/,/g, '.');
		if (
			token &&
			currency &&
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			if (isWyreCurrency) {
				setLoadingPrices(true);
				const quotation = await getWalletOrderQuotation({
					sourceAmount: +formatedValue,
					destAmount: undefined,
					destCurrency: token.symbol,
					accountAddress: address,
					network,
					country: currency.country,
					sourceCurrency: currency.code
				});

				const { errorCode, message, destAmount } = quotation;

				if (errorCode) {
					addError(i18n.t(`AddFundsScreen.Errors.${errorCode.replace('.', '_')}`, { defaultValue: message }));
					setTokenAmount('');
				} else {
					setTokenAmount(destAmount.toString());
					setFiatAmount(formatedValue);
				}
				setLoadingPrices(false);
			}
		} else {
			setTokenAmount('');
		}
	};

	const updateToken = async (amount: string) => {
		setFiat(false);
		const formatedValue = amount.replace(/,/g, '.');
		if (
			token &&
			currency &&
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			if (isWyreCurrency) {
				setLoadingPrices(true);
				const quotation = await getWalletOrderQuotation({
					sourceAmount: undefined,
					destCurrency: token.symbol,
					accountAddress: address,
					network,
					destAmount: +formatedValue,
					country: currency.country,
					sourceCurrency: currency.code
				});
				const { errorCode, message, sourceAmountWithFees } = quotation;

				if (errorCode) {
					addError(i18n.t(`AddFundsScreen.Errors.${errorCode.replace('.', '_')}`, { defaultValue: message }));
					setFiatAmount('');
				} else {
					setFiatAmount(sourceAmountWithFees.toString());
					setTokenAmount(formatedValue);
				}
				setLoadingPrices(false);
			}
		} else {
			setFiatAmount('');
		}
	};

	const paymentEnabled =
		!loadingPrices && token && currency && fiatAmount && tokenAmount && +fiatAmount > 0 && +tokenAmount > 0;

	const disableApplePay = !(showApplePay && paymentEnabled);

	useEffect(() => {
		const countryLetters = Object.keys(countries).find((key) => countries[key] === country);
		const defaultCurrency = currencies.find((c) => c.country === countryLetters);
		setCurrency(defaultCurrency || currencies[0]);
	}, [country, currencies]);

	useEffect(() => {
		setToken(topUpTokens[0]);
	}, []);

	useEffect(() => {
		if (applePayError) {
			addError(applePayError.description);
		}
	}, [applePayError]);

	useEffect(() => {
		if (orderId) {
			navigation.navigate('TopUpWaitScreen');
		}
	}, [orderId]);

	return {
		currency,
		selectCurrency,
		currencySearchVisible,
		openCurrencySearch,
		dismissCurrencySearch,
		loadingPrices,
		updateFiat,
		token,
		tokenSearchVisible,
		openTokenSearch,
		dismissTokenSearch,
		topUpTokens,
		selectToken,
		tokenAmount,
		updateToken,
		fiatAmount,
		error,
		setError,
		showApplePay,
		disableApplePay,
		onApplePayPurchase
	};
};

export default useAddFundsScreen;
