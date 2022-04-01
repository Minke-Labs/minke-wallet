import React, { useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@hooks';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { Network, network as selectedNetwork, networkSettingsKey } from '@models/network';
import Logger from '@utils/logger';

export const useChangeNetworkScreen = () => {
	const navigation = useNavigation();

	const state = useState(globalWalletState());
	const { privateKey, address } = state.value;
	const [connectedNetwork, setConnectedNetwork] = React.useState<Network>();

	const goBack = () => navigation.goBack();

	const selectNetwork = async (network: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, network.id);
			setConnectedNetwork(network);
			const { balance } = await fetchTokensAndBalances(privateKey, address);
			state.network.set(network);
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

	return {
		connectedNetwork,
		selectNetwork,
		goBack
	};
};
