import React, { useEffect } from 'react';
import { aaveDeposits, AaveBalances, usdCoin, AaveMarket, fetchAaveMarketData } from '@models/deposit';
import { useState } from '@hookstate/core';
import { globalDepositState } from '@src/stores/DepositStore';
import { globalWalletState } from '@src/stores/WalletStore';

export const useSaveScreen = () => {
	const [aaveMarket, setAaveMarket] = React.useState<AaveMarket>();
	const [selectedUSDCoin, setSelectedUSDCoin] = React.useState('');
	const [aaveBalances, setAaveBalances] = React.useState<AaveBalances>();
	const depositState = useState(globalDepositState());
	const { address } = globalWalletState().value;

	const getAaveMarket = async () => {
		const markets = await fetchAaveMarketData();
		const defaultMarket = markets.find((m) => m.tokens[0].symbol === selectedUSDCoin);
		if (defaultMarket) {
			setAaveMarket(defaultMarket);
			depositState.market.set(defaultMarket);
		}
	};

	useEffect(() => {
		const getDefaultUSDCoin = async () => {
			setSelectedUSDCoin(await usdCoin());
		};

		const getAaveDeposits = async () => {
			setAaveBalances(await aaveDeposits(address));
		};

		getDefaultUSDCoin();
		getAaveDeposits();
	}, []);

	useEffect(() => {
		if (selectedUSDCoin) {
			getAaveMarket();
		}
	}, [selectedUSDCoin]);

	return {
		address,
		aaveBalances,
		aaveMarket,
		setSelectedUSDCoin
	};
};
