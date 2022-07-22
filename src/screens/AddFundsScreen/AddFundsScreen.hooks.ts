import React, { useEffect } from 'react';
import { Currency } from '@models/types/currency.types';
import { useCountry, useCurrencies } from '@hooks';

const useAddFundsScreen = () => {
	const [currency, setCurrency] = React.useState<Currency>();
	const [currencySearchVisible, setCurrencySearchVisible] = React.useState(false);
	const { currencies } = useCurrencies();
	const { country } = useCountry();

	useEffect(() => {
		const defaultCurrency = currencies.find((c) => c.country === country);
		setCurrency(defaultCurrency || currencies[0]);
	}, [country]);

	const openCurrencySearch = () => setCurrencySearchVisible(true);
	const dismissCurrencySearch = () => setCurrencySearchVisible(false);

	const selectCurrency = (c: Currency) => {
		setCurrency(c);
		dismissCurrencySearch();
	};

	return { currency, selectCurrency, currencySearchVisible, openCurrencySearch, dismissCurrencySearch };
};

export default useAddFundsScreen;
