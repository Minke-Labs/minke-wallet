import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMStablePoolData, usdCoin } from '@models/deposit';
import { getAavePools } from '@src/services/apis/covalent/covalent';
import { DepositableToken, getDepositToken } from '@models/depositTokens';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

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
	const {
		network: { name, id }
	} = useState(globalWalletState()).value;
	const [selectedProtocol, setSelectedProtocol] = React.useState<DepositProtocol>();
	const [selectedUSDCoin, setSelectedUSDCoin] = React.useState('');
	const [depositableToken, setDepositableToken] = React.useState<DepositableToken>();
	const [apy, setApy] = React.useState('');

	const onChangeProtocol = async (protocol: DepositProtocol) => {
		await AsyncStorage.setItem('@depositProtocol', protocol.id);
		setSelectedProtocol(protocol);
	};

	const fetchSelectedProtocol = async () => {
		const protocol = await AsyncStorage.getItem('@depositProtocol');
		// @TODO: Change it here to mStable
		const setupProtocol = protocol ? availableDepositProtocols[protocol] : availableDepositProtocols.aave;
		setSelectedProtocol(setupProtocol);
	};

	const fetchDepositToken = async () => {
		if (selectedUSDCoin) {
			const token = getDepositToken(id, selectedUSDCoin);
			setDepositableToken(token);
		}
	};

	const getDefaultUSDCoin = async () => {
		setSelectedUSDCoin(await usdCoin());
	};

	useEffect(() => {
		getDefaultUSDCoin();
		fetchSelectedProtocol();
	}, []);

	useEffect(() => {
		if (selectedUSDCoin && selectedProtocol) {
			fetchDepositToken();
		}
	}, [selectedUSDCoin, selectedProtocol]);

	useEffect(() => {
		const updateApy = async () => {
			if (selectedProtocol) {
				if (selectedProtocol.id === 'aave') {
					const pools = await getAavePools();
					const pool = pools.find(
						({ underlying }) =>
							underlying.contract_ticker_symbol.toLowerCase() === selectedUSDCoin.toLowerCase()
					);
					if (pool) {
						setApy((pool.supply_apy * 100).toFixed(2));
					}
				} else {
					const poolData = await fetchMStablePoolData();
					const pool = poolData.pools.find(
						({ pair, chain }) => chain === name.toLowerCase() && pair === 'imUSD'
					);
					if (pool) {
						setApy(pool.apy.toFixed(2));
					}
				}
			}
		};
		if (depositableToken) {
			updateApy();
		}
	}, [depositableToken]);

	return {
		availableDepositProtocols,
		selectedProtocol,
		apy,
		depositableToken,
		onChangeProtocol,
		setSelectedUSDCoin
	};
};

export default useDepositProtocols;
