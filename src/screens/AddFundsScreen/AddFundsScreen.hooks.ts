import React, { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Currency } from '@models/types/currency.types';
import { useAmplitude, useCountry, useCurrencies, useLanguage, useNavigation, useWyreApplePay } from '@hooks';
import { countries } from '@styles';
import { getWalletOrderQuotation } from '@models/wyre';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';
import { euroCountries } from '@src/styles/countries';
import { getPrices, makeOrder, pickPaymentMethodFromName } from '@models/banxa';

const useAddFundsScreen = () => {
	const { address, network } = useState(globalWalletState()).value;
	const { topUpTokens, nativeToken } = network;
	const [currency, setCurrency] = React.useState<Currency>();
	const [token, setToken] = React.useState<MinkeToken>();
	const [currencySearchVisible, setCurrencySearchVisible] = React.useState(false);
	const [tokenSearchVisible, setTokenSearchVisible] = React.useState(false);
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [tokenAmount, setTokenAmount] = React.useState<string | undefined>();
	const [fiatAmount, setFiatAmount] = React.useState<string | undefined>();
	const [fiat, setFiat] = React.useState(false);
	const [error, setError] = React.useState('');
	const [orderLink, setOrderLink] = React.useState('');
	const { currencies, providers } = useCurrencies();
	const { country } = useCountry();
	const { i18n, countries: banxaCountries } = useLanguage();
	const useApplePay = currency && providers.wyre.includes(currency);
	const useBanxa = !useApplePay && currency && providers.banxa.includes(currency);
	const showApplePay = useApplePay && Platform.OS === 'ios';
	const navigation = useNavigation();
	const { onPurchase, orderId, error: applePayError } = useWyreApplePay();
	const { track } = useAmplitude();
	const countryCode = Object.keys(countries).find((key) => countries[key] === country) || 'US';
	// @ts-ignore
	const euCountry = countryCode && euroCountries[countryCode];
	const countryIso =
		currency?.country === 'EU'
			? euCountry && countryCode !== 'EU'
				? countryCode
				: 'DE'
			: currency?.country || countryCode || 'US';

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
			country: countryIso
		});
	};

	const onOnrampPurchase = async () => {
		const { country: currencyCountry, code } = currency!;
		const { symbol } = token!;
		const locationCountry = banxaCountries.find(({ iso }) => iso === currencyCountry);
		const { id, minTopup } = await pickPaymentMethodFromName(locationCountry!.paymentName!);

		if (+minTopup > +fiatAmount!) {
			addError(i18n.t('AddFundsScreen.Errors.minimal_topup_amount', { currency: code, amount: minTopup }));
			return;
		}

		setLoadingPrices(true);

		const params = {
			account_reference: address,
			source: code,
			target: symbol.toUpperCase(),
			source_amount: fiat ? fiatAmount : undefined,
			target_amount: fiat ? undefined : tokenAmount,
			return_url_on_success: '#',
			wallet_address: address,
			payment_method_id: id,
			blockchain: nativeToken.symbol
		};

		const url = await makeOrder({ params });
		setOrderLink(url);
		setLoadingPrices(false);
	};

	const dismissCurrencySearch = () => setCurrencySearchVisible(false);
	const dismissTokenSearch = () => setTokenSearchVisible(false);

	const openTokenSearch = () => {
		dismissCurrencySearch();
		Keyboard.dismiss();
		setTokenSearchVisible(true);
	};
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
		const formatedValue = amount.replace(/,/g, '.');
		if (
			token &&
			currency &&
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			setFiat(true);

			if (useApplePay) {
				setLoadingPrices(true);
				const quotation = await getWalletOrderQuotation({
					sourceAmount: +formatedValue,
					destAmount: undefined,
					destCurrency: token.symbol,
					accountAddress: address,
					network,
					country: countryIso,
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

			if (useBanxa) {
				setLoadingPrices(true);
				const locationCountry = banxaCountries.find(({ iso }) => iso === currency.country);
				const paymentMethod = await pickPaymentMethodFromName(locationCountry!.paymentName!);
				const params = {
					blockchain: nativeToken.symbol,
					source: currency.code,
					source_amount: +formatedValue,
					target: token.symbol.toUpperCase(),
					target_amount: undefined,
					payment_method_id: paymentMethod.id
				};
				const {
					data: { prices }
				} = await getPrices({ params });
				const [price] = prices;
				setTokenAmount(price.coin_amount);
				setFiatAmount(formatedValue);
				setLoadingPrices(false);
			}
		}
	};

	const updateToken = async (amount: string) => {
		const formatedValue = amount.replace(/,/g, '.');
		if (
			token &&
			currency &&
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			setFiat(false);
			if (useApplePay) {
				setLoadingPrices(true);
				const quotation = await getWalletOrderQuotation({
					sourceAmount: undefined,
					destCurrency: token.symbol,
					accountAddress: address,
					network,
					destAmount: +formatedValue,
					country: countryIso,
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

			if (useBanxa) {
				setLoadingPrices(true);
				const locationCountry = banxaCountries.find(({ iso }) => iso === currency.country);
				const paymentMethod = await pickPaymentMethodFromName(locationCountry!.paymentName!);
				const params = {
					blockchain: nativeToken.symbol,
					source: currency.code,
					source_amount: undefined,
					target: token.symbol.toUpperCase(),
					target_amount: +formatedValue,
					payment_method_id: paymentMethod.id
				};
				const {
					data: { prices }
				} = await getPrices({ params });
				const [price] = prices;
				setFiatAmount(price.fiat_amount);
				setTokenAmount(formatedValue);
				setLoadingPrices(false);
			}
		}
	};

	const paymentEnabled =
		!loadingPrices && token && currency && fiatAmount && tokenAmount && +fiatAmount > 0 && +tokenAmount > 0;

	const disableApplePay = !(showApplePay && paymentEnabled);
	const disableBanxa = !paymentEnabled;

	useEffect(() => {
		let defaultCurrency = currencies.find((c) => c.country === countryCode);
		if (!defaultCurrency && euCountry) {
			defaultCurrency = currencies.find(({ code }) => code === 'EUR');
		}
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
		if (token && currency && countryIso && !tokenAmount && !fiatAmount) {
			updateToken('100');
		}
	}, [token, currency, countryIso]);

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
		disableBanxa,
		onOnrampPurchase,
		orderLink,
		setOrderLink
	};
};

export default useAddFundsScreen;
