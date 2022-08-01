import { Currency } from '@models/types/currency.types';
import { useEffect, useState } from 'react';
import { getCurrencies } from '@src/services/apis';
import { fiatCurrencies } from '@models/currency';
import { availableFiatCurrencies } from '@models/wyre';

type Providers = 'moonpay' | 'wyre';

type CurrencyProvider = {
	[key in Providers]: Currency[];
};

const useCurrencies = () => {
	const [providers, setProviders] = useState<CurrencyProvider>({ moonpay: [], wyre: [] });
	const [currencies, setCurrencies] = useState<Currency[]>([]);

	useEffect(() => {
		const fetchCurrencies = async () => {
			const moonpayCurrencies = await getCurrencies();
			const enabled = moonpayCurrencies.filter(({ type }) => type === 'fiat');
			const moonpay = enabled.map(({ code }) => fiatCurrencies[code.toUpperCase()]);
			const wyre = Object.values(availableFiatCurrencies);
			const fiat: CurrencyProvider = { moonpay, wyre };
			let all = Object.values(fiat).flat();
			all = [...new Set(all)];
			setProviders(fiat);
			setCurrencies(all);
		};

		fetchCurrencies();
	}, []);

	return {
		currencies,
		providers
	};
};

export default useCurrencies;
