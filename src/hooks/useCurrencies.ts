import { Currency } from '@models/types/currency.types';
import { useEffect, useState } from 'react';
import { getCurrencies } from '@src/services/apis';
import { fiatCurrencies } from '@models/currency';
import { availableFiatCurrencies } from '@models/wyre';
import { availableFiatCurrencies as banxaAvailableFiatCurrencies } from '@models/banxa';
import { Platform } from 'react-native';

type Providers = 'moonpay' | 'wyre' | 'banxa';

type CurrencyProvider = {
	[key in Providers]: Currency[];
};

const useCurrencies = () => {
	const [providers, setProviders] = useState<CurrencyProvider>({ moonpay: [], wyre: [], banxa: [] });
	const [currencies, setCurrencies] = useState<Currency[]>([]);

	useEffect(() => {
		const fetchCurrencies = async () => {
			const moonpayCurrencies = await getCurrencies();
			const enabled = moonpayCurrencies.filter(({ type }) => type === 'fiat');
			const moonpay = enabled.map(({ code, minBuyAmount, maxBuyAmount }) => ({
				...fiatCurrencies[code.toUpperCase()],
				minBuyAmount,
				maxBuyAmount
			}));
			const wyre = Platform.OS === 'android' ? [] : Object.values(availableFiatCurrencies);
			const banxa = Object.values(banxaAvailableFiatCurrencies);
			const fiat: CurrencyProvider = { moonpay, wyre, banxa };
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
