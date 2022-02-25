import React, { useEffect } from 'react';
import { fetchAaveMarketData, usdCoin, AaveMarket, approvalState } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { useState } from '@hookstate/core';
import { globalDepositState } from '@stores/DepositStore';
import AppLoading from 'expo-app-loading';
import Deposit from './Deposit/Deposit';
import OpenAave from './OpenAave/OpenAave';

const DepositScreen = () => {
	const [approved, setApproved] = React.useState<boolean | undefined>();
	const [selectedUSDCoin, setSelectedUSDCoin] = React.useState('');
	const [aaveMarket, setAaveMarket] = React.useState<AaveMarket>();
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

	const loadApproved = async () => {
		if (aaveMarket) {
			const { isApproved } = await approvalState(address, aaveMarket?.tokens[0].address);
			setApproved(isApproved);
		}
	};

	useEffect(() => {
		const getDefaultUSDCoin = async () => {
			setSelectedUSDCoin(await usdCoin());
		};

		getDefaultUSDCoin();
	}, []);

	useEffect(() => {
		if (selectedUSDCoin) {
			getAaveMarket();
		}
	}, [selectedUSDCoin]);

	useEffect(() => {
		if (aaveMarket) {
			loadApproved();
		}
	}, [aaveMarket]);

	if (approved === undefined) {
		return <AppLoading />;
	}

	if (approved) return <Deposit />;
	return <OpenAave />;
};

export default DepositScreen;
