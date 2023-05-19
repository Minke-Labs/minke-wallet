import { useEffect, useState } from 'react';

import { availableFiatCurrencies as banxaAvailableFiatCurrencies } from '@models/banxa';
import { fiatCurrencies } from '@models/currency';
import { networks } from '@models/network';
import { Currency } from '@models/types/currency.types';
import { getCurrencies } from '@src/services/apis';

import useGlobalWalletState from './useGlobalWalletState';

type Providers = 'moonpay' | 'banxa';

type CurrencyProvider = {
	[key in Providers]: Currency[];
};

const useCurrencies = () => {
	const [providers, setProviders] = useState<CurrencyProvider>({ moonpay: [], banxa: [] });
	const [currencies, setCurrencies] = useState<Currency[]>([]);
	const {
		network: { chainId }
	} = useGlobalWalletState();

	useEffect(() => {
		const fetchCurrencies = async () => {
			const moonpayCurrencies = await getCurrencies();
			const enabled = moonpayCurrencies.filter(({ type }) => type === 'fiat');
			const moonpay = enabled.map(({ code }) => fiatCurrencies[code.toUpperCase()]);
			const banxa =
				chainId === networks['binance-smart-chain'].chainId ? [] : Object.values(banxaAvailableFiatCurrencies);
			const fiat: CurrencyProvider = { moonpay, banxa };
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
