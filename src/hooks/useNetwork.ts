import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { captureException } from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { Network, network as selectedNetwork, networkSettingsKey } from '@models/network';
import Logger from '@utils/logger';
import useNavigation from './useNavigation';

const useFetchCurrentNetwork = () => {
	const navigation = useNavigation();
	const [network, setConnectedNetwork] = React.useState<Network>();

	const state = useState(globalWalletState());
	const { privateKey, address } = state.value;

	const selectNetwork = async (ntw: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, ntw.id);
			await AsyncStorage.setItem('@current:network', JSON.stringify(ntw));
			setConnectedNetwork(ntw);
			const { balance } = await fetchTokensAndBalances(privateKey, address);
			state.network.set(ntw);
			state.balance.set(balance);
			state.transactions.set(undefined);
			navigation.navigate('WalletScreen');
		} catch (e) {
			Logger.error('Error saving settings');
			captureException(e);
		}
	};

	useEffect(() => {
		const fetchNetwork = async () => {
			setConnectedNetwork(await selectedNetwork());
		};

		fetchNetwork();
	}, []);

	useEffect(() => {
		const fetchNetwork = async () => {
			const res = await AsyncStorage.getItem('@current:network');
			const parsedRes = JSON.parse(res!);
			setConnectedNetwork(parsedRes);
		};
		fetchNetwork();
	}, [network]);

	return {
		network,
		selectNetwork
	};
};

export default useFetchCurrentNetwork;
