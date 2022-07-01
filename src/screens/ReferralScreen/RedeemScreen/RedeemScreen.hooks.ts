import { MinkeToken } from '@models/token';
import { useEffect, useState } from 'react';

const POINTS_TO_USD_CONVERSION = 0.1;

const useRedeemScreenHooks = (points: number) => {
	const [fromToken, setFromToken] = useState<MinkeToken>();
	const [toToken, setToToken] = useState<MinkeToken>();
	const [conversionAmount, setConversionAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(0);
	const redeemable = { id: 'matic-network', name: 'Matic' };

	const loadPrices = async (amount: number): Promise<number> => {
		setLoading(true);
		const result = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${redeemable.id}&vs_currencies=usd`
		);
		const quotes = await result.json();
		const maticQuote = quotes[redeemable.id].usd;
		setLoading(false);
		return (amount * POINTS_TO_USD_CONVERSION) / maticQuote;
	};

	useEffect(() => {
		const setup = async () => {
			const maticQtd = await loadPrices(points);
			const balanceUSD = points * POINTS_TO_USD_CONVERSION;
			setFromToken({ symbol: 'MINKE', address: 'minke', decimals: 18, balance: points.toString(), balanceUSD });
			setToToken({ symbol: 'MATIC', address: 'matic', decimals: 18, balance: maticQtd.toString(), balanceUSD });
		};

		setup();
	}, []);

	const updateFromQuotes = async (amount: string) => {
		const formatedValue = amount.replace(/,/g, '.');
		if (
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			const inputValue = Number(formatedValue);
			const maticQtd = await loadPrices(inputValue);
			setConversionAmount(maticQtd.toString());
			setValue(inputValue);
		} else {
			setValue(0);
		}
	};

	return { fromToken, toToken, updateFromQuotes, loading, conversionAmount, canSwap: value > 0 && value <= points };
};

export default useRedeemScreenHooks;
