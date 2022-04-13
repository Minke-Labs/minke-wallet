import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { captureException } from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { Network, network as selectedNetwork, networkSettingsKey } from '@models/network';
import Logger from '@utils/logger';
import useNavigation from './useNavigation';

const useNetwork = () => {
	const navigation = useNavigation();
	const [connectedNetwork, setConnectedNetwork] = React.useState<Network>();

	const state = useState(globalWalletState());
	const { privateKey, address } = state.value;

	const selectNetwork = async (network: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, network.id);
			setConnectedNetwork(network);
			const { balance } = await fetchTokensAndBalances(privateKey, address);
			state.merge({ network, balance, transactions: undefined });
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

	return {
		network: connectedNetwork,
		selectNetwork
	};
};

export default useNetwork;
