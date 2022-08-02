import React, { useEffect } from 'react';
import { Currency } from '@models/types/currency.types';
import { useCountry, useCurrencies } from '@hooks';
import { countries } from '@styles';
import { getWalletOrderQuotation } from '@models/wyre';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { MinkeToken } from '@models/types/token.types';

const useAddFundsScreen = () => {
	const { address, network } = useState(globalWalletState()).value;
	const { topUpTokens } = network;
	const [currency, setCurrency] = React.useState<Currency>();
	const [token, setToken] = React.useState<MinkeToken>();
	const [currencySearchVisible, setCurrencySearchVisible] = React.useState(false);
	const [tokenSearchVisible, setTokenSearchVisible] = React.useState(false);
	const [isWyreCurrency, setIsWyreCurrency] = React.useState(false);
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const { currencies, providers } = useCurrencies();
	const { country } = useCountry();

	useEffect(() => {
		const countryLetters = Object.keys(countries).find((key) => countries[key] === country);
		const defaultCurrency = currencies.find((c) => c.country === countryLetters);
		setCurrency(defaultCurrency || currencies[0]);
	}, [country, currencies]);

	useEffect(() => {
		if (currency) setIsWyreCurrency(providers.wyre.includes(currency));
	}, [currency]);

	useEffect(() => {
		setToken(topUpTokens[0]);
	}, []);

	const openCurrencySearch = () => setCurrencySearchVisible(true);
	const dismissCurrencySearch = () => setCurrencySearchVisible(false);
	const openTokenSearch = () => setTokenSearchVisible(true);
	const dismissTokenSearch = () => setTokenSearchVisible(false);

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
			currency &&
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			if (isWyreCurrency) {
				setLoadingPrices(true);
				const quotation = await getWalletOrderQuotation(
					formatedValue,
					'MATIC',
					address,
					network,
					currency.country,
					currency.code,
					true
				);
				console.log(quotation);
				setLoadingPrices(false);
			}
		}
	};

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
		selectToken
	};
};

export default useAddFundsScreen;
