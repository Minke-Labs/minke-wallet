import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Currency } from '@models/types/currency.types';
import {
	useAmplitude,
	useCountry,
	useCurrencies,
	useGlobalWalletState,
	useLanguage,
	useNavigation,
	useWyreApplePay
} from '@hooks';
import { countries } from '@styles';
import { getWalletOrderQuotation } from '@models/wyre';
import { MinkeToken, TopupToken } from '@models/types/token.types';
import { euroCountries } from '@src/styles/countries';
import { getPrices, makeOrder, pickPaymentMethodFromName } from '@models/banxa';
import { buyQuote } from '@src/services/apis/moonpay/moonpay';
import { MOONPAY_API_KEY, MOONPAY_BUY_URL, MOONPAY_SECRET_KEY } from '@env';
import crypto from 'crypto';
import * as qs from 'qs';
import * as Linking from 'expo-linking';
import SafariView from 'react-native-safari-view';

const useAddFundsScreen = (topupToken?: MinkeToken) => {
	const { address, network } = useGlobalWalletState();
	const { topUpTokens, nativeToken, wyreSRN } = network;
	const [currency, setCurrency] = useState<Currency>();
	const [token, setToken] = useState<TopupToken>(topupToken as MinkeToken);
	const [currencySearchVisible, setCurrencySearchVisible] = useState(false);
	const [tokenSearchVisible, setTokenSearchVisible] = useState(false);
	const [loadingPrices, setLoadingPrices] = useState(false);
	const [tokenAmount, setTokenAmount] = useState<string | undefined>();
	const [fiatAmount, setFiatAmount] = useState<string | undefined>();
	const [fiat, setFiat] = useState(false);
	const [error, setError] = useState('');
	const { currencies, providers } = useCurrencies();
	const { country } = useCountry();
	const { i18n, countries: banxaCountries } = useLanguage();
	const useApplePay = Platform.OS === 'ios' && !!wyreSRN && currency && providers.wyre.includes(currency);
	const useBanxa = currency && providers.banxa.includes(currency);
	const useMoonpay = currency && (!useBanxa || !useApplePay) && providers.moonpay.includes(currency);
	const moonPaySpecialButton = useMoonpay && ['BRL', 'EUR', 'GBP'].includes(currency.code);
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
		const { symbol, wyreSymbol } = token!;
		track('Started Apple Pay Payment', { currency: code, value });
		onPurchase({
			sourceCurrency: code,
			destCurrency: wyreSymbol || symbol,
			value,
			fiat,
			country: countryIso
		});
	};

	const openWebView = (url: string, title: string) => {
		setLoadingPrices(false);
		try {
			SafariView.show({
				url
			});
		} catch {
			navigation.navigate('WebViewScreen', { uri: url, title });
		}
	};

	const onOnrampBanxaPurchase = async () => {
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
			blockchain: nativeToken.symbol,
			wallet_address_tag: address
		};

		const url = await makeOrder({ params });
		openWebView(url, 'Banxa');
	};

	const onMoonpayPurchase = async () => {
		const { code } = currency!;
		const { symbol, moonpaySymbol } = token!;

		setLoadingPrices(true);
		const apiKey = MOONPAY_API_KEY || process.env.MOONPAY_API_KEY;
		const params = {
			apiKey,
			currencyCode: moonpaySymbol || symbol,
			walletAddress: address,
			baseCurrencyCode: code,
			baseCurrencyAmount: fiat ? fiatAmount : undefined,
			quoteCurrencyAmount: fiat ? undefined : tokenAmount,
			lockAmount: true,
			language: i18n.locale,
			redirectURL: encodeURI(Linking.createURL('/moonpayWaitScreen'))
		};

		const query = `?${qs.stringify(params)}`;
		const host = MOONPAY_BUY_URL || process.env.MOONPAY_BUY_URL;
		const originalUrl = `${host}${query}`;
		const secret = MOONPAY_SECRET_KEY || process.env.MOONPAY_SECRET_KEY;
		const signature = crypto.createHmac('sha256', secret!).update(query).digest('base64');
		const urlWithSignature = `${originalUrl}&signature=${encodeURIComponent(signature)}`;
		openWebView(urlWithSignature, 'MoonPay');
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

	const selectToken = (t: TopupToken) => {
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
					destCurrency: token.wyreSymbol || token.symbol,
					accountAddress: address,
					network,
					country: countryIso,
					sourceCurrency: currency.code
				});

				const { errorCode = '', message, destAmount } = quotation;

				if (errorCode || message) {
					addError(i18n.t(`AddFundsScreen.Errors.${errorCode.replace('.', '_')}`, { defaultValue: message }));
					setTokenAmount('');
				} else {
					setTokenAmount(destAmount.toString());
					setFiatAmount(formatedValue);
				}
				setLoadingPrices(false);
			} else if (useMoonpay) {
				setLoadingPrices(true);
				const params = {
					currencyCode: (token.moonpaySymbol || token.symbol).toLowerCase(),
					quoteCurrencyCode: (token.moonpaySymbol || token.symbol).toLowerCase(),
					baseCurrencyCode: currency.code.toLowerCase(),
					baseCurrencyAmount: formatedValue,
					quoteCurrencyAmount: undefined,
					areFeesIncluded: true
				};
				const { message, quoteCurrencyAmount } = await buyQuote(params);
				if (message) {
					addError(message);
					setTokenAmount('');
				} else {
					setTokenAmount(quoteCurrencyAmount.toString());
					setFiatAmount(formatedValue);
				}
				setLoadingPrices(false);
			} else if (useBanxa) {
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
					destCurrency: token.wyreSymbol || token.symbol,
					accountAddress: address,
					network,
					destAmount: +formatedValue,
					country: countryIso,
					sourceCurrency: currency.code
				});
				const { errorCode = '', message, sourceAmountWithFees } = quotation;
				if (errorCode || message) {
					addError(i18n.t(`AddFundsScreen.Errors.${errorCode.replace('.', '_')}`, { defaultValue: message }));
					setFiatAmount('');
				} else {
					setFiatAmount(sourceAmountWithFees.toString());
					setTokenAmount(formatedValue);
				}
				setLoadingPrices(false);
			} else if (useMoonpay) {
				setLoadingPrices(true);
				const params = {
					currencyCode: (token.moonpaySymbol || token.symbol).toLowerCase(),
					quoteCurrencyCode: (token.moonpaySymbol || token.symbol).toLowerCase(),
					baseCurrencyCode: currency.code.toLowerCase(),
					baseCurrencyAmount: undefined,
					quoteCurrencyAmount: formatedValue,
					areFeesIncluded: true
				};

				const { message, totalAmount } = await buyQuote(params);

				if (message) {
					addError(message);
					setFiatAmount('');
				} else {
					setFiatAmount(totalAmount.toString());
					setTokenAmount(formatedValue);
				}
				setLoadingPrices(false);
			} else if (useBanxa) {
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

	const disableApplePay = !(useApplePay && paymentEnabled);
	const disableBanxa = !paymentEnabled;
	const disableMoonPay = !disableBanxa && !paymentEnabled;

	useEffect(() => {
		let defaultCurrency = currencies.find((c) => c.country === countryCode);
		if (!defaultCurrency && euCountry) {
			defaultCurrency = currencies.find(({ code }) => code === 'EUR');
		}
		setCurrency(defaultCurrency || currencies[0]);
	}, [country, currencies]);

	useEffect(() => {
		if (!token?.symbol) setToken(topUpTokens[0]);
	}, []);

	useEffect(() => {
		if (fiatAmount) {
			updateFiat(fiatAmount);
		}
	}, [token]);

	useEffect(() => {
		if (token && currency && countryIso && !tokenAmount && !fiatAmount) {
			updateToken(token.suggestedBuyAmount?.toString() || '100');
		}
	}, [token, currency, countryIso]);

	useEffect(() => {
		if (currency && tokenAmount) {
			updateToken(tokenAmount);
		}
	}, [currency]);

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
		disableApplePay,
		onApplePayPurchase,
		disableBanxa,
		onOnrampBanxaPurchase,
		useApplePay,
		useBanxa,
		useMoonpay,
		disableMoonPay,
		onMoonpayPurchase,
		moonPaySpecialButton
	};
};

export default useAddFundsScreen;
