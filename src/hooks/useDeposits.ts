import React, { useEffect } from 'react';
import { MinkeToken } from '@models/token';
import { useSaveScreen } from '@src/screens/SaveScreen/SaveScreen.hooks';
import useTokens from './useTokens';

const useDeposits = () => {
	const [tokens, setTokens] = React.useState<MinkeToken[]>();
	const { address: walletAddress, aaveBalances } = useSaveScreen();
	const { interestTokens } = useTokens();

	useEffect(() => {
		const loadTokens = async () => {
			if (aaveBalances) {
				const { products = [] } = aaveBalances[walletAddress.toLowerCase()];
				const lending = products.find((p) => p.label === 'Lending');
				const deposits = interestTokens.map((t) => t.symbol);

				if (lending) {
					const assets = lending.assets.filter((asset) => deposits.includes(asset.symbol));
					const minkeTokens: MinkeToken[] = assets.map((asset) => {
						const { address: interestBearingAddress, tokens: coins } = asset;
						const { balance, balanceUSD, decimals, symbol, address } = coins[0];
						return {
							address,
							balance: balance.toString(),
							balanceUSD,
							decimals,
							symbol,
							name: symbol,
							image: symbol,
							interestBearingAddress
						};
					});
					setTokens(minkeTokens);
				}
			}
		};

		loadTokens();
	}, [aaveBalances, interestTokens]);

	return { tokens };
};

export default useDeposits;
