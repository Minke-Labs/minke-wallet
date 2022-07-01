import { MinkeToken } from '@models/token';
import { useEffect, useState } from 'react';

const POINTS_TO_USD_CONVERSION = 0.1;

const useRedeemModalHooks = (points: number) => {
	const [fromToken, setFromToken] = useState<MinkeToken>();
	const [toToken, setToToken] = useState<MinkeToken>();
	const redeemable = { id: 'matic-network', name: 'Matic' };

	const loadPrices = async (amount: number) => {
		console.log('Loading prices for ', amount);
		const result = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${redeemable.id}&vs_currencies=usd`
		);
		const quotes = await result.json();
		const maticQuote = quotes[redeemable.id].usd;
		const balanceUSD = amount * POINTS_TO_USD_CONVERSION;
		const qtd = (amount * POINTS_TO_USD_CONVERSION) / maticQuote;
		setFromToken({ symbol: 'MINKE', address: 'minke', decimals: 18, balance: amount.toString(), balanceUSD });
		setToToken({ symbol: 'MATIC', address: 'matic', decimals: 18, balance: qtd.toString(), balanceUSD });
	};

	useEffect(() => {
		loadPrices(points);
	}, []);

	const updateFromQuotes = (amount: string) => {
		console.log('Updated', amount);
		// loadPrices(Number(amount));
	};

	return { fromToken, toToken, updateFromQuotes, loading: false };
};

export default useRedeemModalHooks;
