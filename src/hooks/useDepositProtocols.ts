import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DepositProtocol, fetchDepositProtocol, fetchMStablePoolData, usdCoin } from '@models/deposit';
import { getAavePools } from '@src/services/apis/covalent/covalent';
import { DepositableToken, getDepositToken } from '@models/depositTokens';
import { network } from '@models/network';

const useDepositProtocols = () => {
	const [selectedProtocol, setSelectedProtocol] = React.useState<DepositProtocol>();
	const [selectedUSDCoin, setSelectedUSDCoin] = React.useState('');
	const [depositableToken, setDepositableToken] = React.useState<DepositableToken>();
	const [apy, setApy] = React.useState('');

	const onChangeProtocol = async (protocol: DepositProtocol) => {
		await AsyncStorage.setItem('@depositProtocol', protocol.id);
		setSelectedProtocol(protocol);
	};

	const fetchSelectedProtocol = async () => {
		setSelectedProtocol(await fetchDepositProtocol());
	};

	const fetchDepositToken = async () => {
		if (selectedUSDCoin && selectedProtocol) {
			const { id } = await network();
			const token = await getDepositToken(id, selectedUSDCoin, selectedProtocol.id);
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
					const { name } = await network();
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
		selectedProtocol,
		apy,
		depositableToken,
		onChangeProtocol,
		setSelectedUSDCoin
	};
};

export default useDepositProtocols;
