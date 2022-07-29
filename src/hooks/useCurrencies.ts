import { Currency } from '@models/types/currency.types';
import { useEffect, useState } from 'react';
import { getCurrencies } from '@src/services/apis';
import { fiatCurrencies } from '@models/currency';

const useCurrencies = () => {
	const [currencies, setCurrencies] = useState<Currency[]>([]);

	useEffect(() => {
		const fetchCurrencies = async () => {
			const moonpayCurrencies = await getCurrencies();
			const enabled = moonpayCurrencies.filter(({ type }) => type === 'fiat');
			setCurrencies(enabled.map(({ code }) => fiatCurrencies[code.toUpperCase()]));
		};

		fetchCurrencies();
	}, []);

	return {
		currencies
	};
};

export default useCurrencies;
