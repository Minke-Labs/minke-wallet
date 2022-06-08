import { useEffect, useState } from 'react';

interface Token {
	id: string;
	name: string;
	usdPrice: number;
}

const useRedeemModalHooks = () => {
	const [tokens, setTokens] = useState<Token[]>([]);
	const redeemable = [
		{ id: 'aave', name: 'Aave' },
		{ id: 'meta', name: 'mStable' },
		{ id: 'matic-network', name: 'Matic' }
	];
	const ids = redeemable.map(({ id }) => id);

	useEffect(() => {
		const loadPrices = async () => {
			const result = await fetch(
				`https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`
			);
			const quotes = await result.json();
			setTokens(redeemable.map(({ id, name }) => ({ id, name, usdPrice: quotes[id].usd } as Token)));
		};
		loadPrices();
	}, []);

	return { tokens };
};

export default useRedeemModalHooks;
