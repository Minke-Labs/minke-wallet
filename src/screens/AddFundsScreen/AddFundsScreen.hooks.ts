import React, { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Currency } from '@models/types/currency.types';
import { useAmplitude, useCountry, useCurrencies, useLanguage, useNavigation, useWyreApplePay } from '@hooks';
import { allCountries, countries } from '@styles';
import { getWalletOrderQuotation } from '@models/wyre';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';
import { euroCountries } from '@src/styles/countries';

const useAddFundsScreen = () => {
	const { address, network } = useState(globalWalletState()).value;
	const { topUpTokens } = network;
	const [currency, setCurrency] = React.useState<Currency>();
	const [token, setToken] = React.useState<MinkeToken>();
	const [currencySearchVisible, setCurrencySearchVisible] = React.useState(false);
	const [tokenSearchVisible, setTokenSearchVisible] = React.useState(false);
	const [countrySearchVisible, setCountrySearchVisible] = React.useState(false);
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [tokenAmount, setTokenAmount] = React.useState<string | undefined>();
	const [fiatAmount, setFiatAmount] = React.useState<string | undefined>();
	const [fiat, setFiat] = React.useState(true);
	const [error, setError] = React.useState('');
	const [countryLetters, setCountryLetters] = React.useState('');
	const { currencies, providers } = useCurrencies();
	const { country } = useCountry();
	const { i18n } = useLanguage();
	const isWyreCurrency = currency && providers.wyre.includes(currency);
	const showApplePay = isWyreCurrency && Platform.OS === 'ios';
	const navigation = useNavigation();
	const { onPurchase, orderId, error: applePayError } = useWyreApplePay();
	const { track } = useAmplitude();
	const foundCountry = allCountries.find((c) => c.flag === country);

	const addError = (err: string) => {
		Keyboard.dismiss();
		setError(err);
	};

	const onApplePayPurchase = () => {
		Keyboard.dismiss();
		const value = fiat ? +fiatAmount! : +tokenAmount!;
		const { code } = currency!;
		track('Started Apple Pay Payment', { currency: code, value });
		onPurchase({
			sourceCurrency: code,
			destCurrency: token!.symbol,
			value,
			fiat,
			country: countryLetters
		});
	};

	const dismissCurrencySearch = () => setCurrencySearchVisible(false);
	const dismissTokenSearch = () => setTokenSearchVisible(false);
	const dismissCountrySearch = () => setCountrySearchVisible(false);

	const openTokenSearch = () => {
		dismissCurrencySearch();
		dismissCountrySearch();
		Keyboard.dismiss();
		setTokenSearchVisible(true);
	};
	const openCurrencySearch = () => {
		dismissTokenSearch();
		dismissCountrySearch();
		Keyboard.dismiss();
		setCurrencySearchVisible(true);
	};
	const openCountrySearch = () => {
		dismissCurrencySearch();
		dismissTokenSearch();
		Keyboard.dismiss();
		setCountrySearchVisible(true);
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
					country: countryLetters,
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
					country: countryLetters,
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
		}
	};

	const paymentEnabled =
		!loadingPrices && token && currency && fiatAmount && tokenAmount && +fiatAmount > 0 && +tokenAmount > 0;

	const disableApplePay = !(showApplePay && paymentEnabled);

	useEffect(() => {
		const countryInitials = Object.keys(countries).find((key) => countries[key] === country);
		let defaultCurrency = currencies.find((c) => c.country === countryInitials);
		// @ts-ignore
		if (!defaultCurrency && countryInitials && euroCountries[countryInitials]) {
			defaultCurrency = currencies.find(({ code }) => code === 'EUR');
		}

		setCountryLetters(countryInitials || 'US');
		setCurrency(defaultCurrency || currencies[0]);
	}, [country, currencies]);

	useEffect(() => {
		setToken(topUpTokens[0]);
	}, []);

	useEffect(() => {
		if (fiatAmount) {
			updateFiat(fiatAmount);
		}
	}, [token]);

	useEffect(() => {
		if (token && currency && !tokenAmount && !fiatAmount) {
			updateToken('100');
		}
	}, [token, currency]);

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
		onApplePayPurchase,
		countrySearchVisible,
		openCountrySearch,
		dismissCountrySearch,
		country: foundCountry
	};
};

export default useAddFundsScreen;
