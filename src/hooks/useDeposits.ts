import React, { useEffect } from 'react';
import { MinkeToken } from '@models/token';
import { useSaveScreen } from '@src/screens/SaveScreen/SaveScreen.hooks';

const useDeposits = () => {
	const [tokens, setTokens] = React.useState<MinkeToken[]>();
	const { address: walletAddress, aaveBalances } = useSaveScreen();

	useEffect(() => {
		const loadTokens = async () => {
			if (aaveBalances) {
				const { products = [] } = aaveBalances[walletAddress.toLowerCase()];
				const lending = products.find((p) => p.label === 'Lending');

				if (lending) {
					const lala: MinkeToken[] = lending.assets.map((asset) => {
						const { address, tokens: coins } = asset;
						const { balance, balanceUSD, decimals, symbol } = coins[0];
						return {
							address,
							balance: balance.toString(),
							balanceUSD,
							decimals,
							symbol,
							name: symbol,
							image: symbol
						};
					});
					setTokens(lala);
				}
			}
		};

		loadTokens();
	}, [aaveBalances]);

	return { tokens };
};

export default useDeposits;
