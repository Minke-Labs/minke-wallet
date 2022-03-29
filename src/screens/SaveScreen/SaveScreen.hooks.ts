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
	// mainnet const address = '0xff32e57ceed15c2e07e03984bba66c220c06b13a';
	// const address = '0x14bebdc546fdc6f01eb216effefa27f43c1c2a2f';
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
		aaveMarket
	};
};
