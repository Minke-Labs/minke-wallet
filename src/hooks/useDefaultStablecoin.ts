import React, { useEffect } from 'react';
import { depositStablecoins, usdCoin } from '@models/deposit';
import { MinkeToken } from '@models/types/token.types';
import useBalances from './useBalances';

const useDefaultStablecoin = () => {
	const [defaultStablecoin, setDefaultStablecoin] = React.useState<MinkeToken | null>();
	const { stablecoins } = useBalances();

	useEffect(() => {
		const fetchDefaultStablecoin = async () => {
			const defaultUSDCoin = await usdCoin();
			let token = stablecoins.find((t) => t.symbol === defaultUSDCoin);
			const hasTheDefaultToken = !!token;
			if (hasTheDefaultToken) {
				setDefaultStablecoin(token);
				return;
			}

			token = stablecoins.reverse().find((t) => depositStablecoins.includes(t.symbol)) || ({} as MinkeToken);

			const { symbol } = token;
			if (symbol) {
				setDefaultStablecoin(token);
			} else {
				setDefaultStablecoin(null);
			}
		};
		fetchDefaultStablecoin();
	}, [stablecoins]);

	return { defaultStablecoin };
};

export default useDefaultStablecoin;
