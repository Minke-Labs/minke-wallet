import React, { useEffect } from 'react';
import { depositStablecoins, usdCoin, usdCoinSettingsKey } from '@models/deposit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTokenBalances } from '@src/services/apis';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useSaveScreen } from '@src/screens/SaveScreen/SaveScreen.hooks';
import { MinkeToken } from '@models/token';

const useDeposit = () => {
	const [ableToDeposit, setAbleToDeposit] = React.useState<boolean | undefined>();
	const [defaultToken, setDefaultToken] = React.useState<MinkeToken | null>();
	const { address } = useState(globalWalletState()).value;
	const { setSelectedUSDCoin } = useSaveScreen();

	useEffect(() => {
		const checkAbleToDeposit = async () => {
			const defaultUSDCoin = await usdCoin();
			const { depositableTokens: tokens } = await getTokenBalances(address);
			let token = tokens.find((t) => t.symbol === defaultUSDCoin);
			const hasTheDefaultToken = !!token;
			if (hasTheDefaultToken) {
				setAbleToDeposit(true);
				setDefaultToken(token);
				return;
			}

			token = tokens.reverse().find((t) => depositStablecoins.includes(t.symbol)) || ({} as MinkeToken);
			const { symbol } = token;
			if (symbol) {
				await AsyncStorage.setItem(usdCoinSettingsKey, symbol);
				setSelectedUSDCoin(symbol);
				setAbleToDeposit(true);
				setDefaultToken(token);
				return;
			}
			setAbleToDeposit(false);
			setDefaultToken(null);
		};
		checkAbleToDeposit();
	}, [address]);

	return { ableToDeposit, defaultToken };
};

export default useDeposit;
