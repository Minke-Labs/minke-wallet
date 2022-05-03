import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalDepositState } from '@stores/DepositStore';

export interface DepositProtocol {
	id: string;
	name: string;
	icon: string;
}

interface DepositProtocols {
	[key: string]: DepositProtocol;
}

const availableDepositProtocols: DepositProtocols = {
	mstable: {
		id: 'mstable',
		name: 'mStable',
		icon: 'MTA'
	},
	aave: {
		id: 'aave',
		name: 'Aave',
		icon: 'AAVE'
	}
};

const useDepositProtocols = () => {
	const [selectedProtocol, setSelectedProtocol] = React.useState<DepositProtocol>();
	const [apy, setApy] = React.useState<string>();
	const { market, mStableApy } = useState(globalDepositState()).value;

	const onChangeProtocol = async (protocol: DepositProtocol) => {
		await AsyncStorage.setItem('@depositProtocol', protocol.id);
		setSelectedProtocol(protocol);
	};

	const fetchSelectedProtocol = async () => {
		const protocol = await AsyncStorage.getItem('@depositProtocol');
		const setupProtocol = protocol ? availableDepositProtocols[protocol] : availableDepositProtocols.mStable;
		setSelectedProtocol(setupProtocol);

		if (setupProtocol.id === 'aave' && market) {
			setApy((market.supplyApy * 100).toFixed(2));
		} else if (mStableApy) {
			setApy(mStableApy.toFixed(2));
		}
	};

	useEffect(() => {
		fetchSelectedProtocol();
	}, []);

	useEffect(() => {
		fetchSelectedProtocol();
	}, [selectedProtocol, market]);

	return {
		availableDepositProtocols,
		selectedProtocol,
		apy,
		onChangeProtocol
	};
};

export default useDepositProtocols;
