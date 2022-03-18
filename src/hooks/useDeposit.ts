import React, { useEffect } from 'react';
import { depositStablecoins, usdCoin, usdCoinSettingsKey } from '@models/deposit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTokenBalances } from '@src/services/apis';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

const useDeposit = () => {
	const [ableToDeposit, setAbleToDeposit] = React.useState<boolean | undefined>();
	const { address } = useState(globalWalletState()).value;

	useEffect(() => {
		const checkAbleToDeposit = async () => {
			const defaultUSDCoin = await usdCoin();
			const { tokens } = await getTokenBalances(address);
			const hasTheDefaultToken = !!tokens.find((t) => t.symbol === defaultUSDCoin);
			if (hasTheDefaultToken) {
				setAbleToDeposit(true);
				return;
			}

			const { symbol } = tokens.find((t) => depositStablecoins.includes(t.symbol)) || {};
			if (symbol) {
				await AsyncStorage.setItem(usdCoinSettingsKey, symbol);
				setAbleToDeposit(true);
				return;
			}
			setAbleToDeposit(false);
		};
		checkAbleToDeposit();
	}, [address]);

	return { ableToDeposit };
};

export default useDeposit;
