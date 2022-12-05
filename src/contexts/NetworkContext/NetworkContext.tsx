import React, { createContext, useMemo, useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Network, selectedNetwork, networkSettingsKey } from '@models/network';
import Logger from '@utils/logger';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

export const NetworkContext = createContext<any>(null);

const NetworkProvider: React.FC = ({ children }) => {
	const [connectedNetwork, setConnectedNetwork] = React.useState<Network>();
	const state = useState(globalWalletState());
	const { network } = state.value;

	const selectNetwork = async (ntw: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, ntw.id);
			setConnectedNetwork(ntw);
			state.merge({ transactions: undefined });
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
	}, [network]);

	const obj = useMemo(
		() => ({
			network: connectedNetwork,
			selectNetwork
		}),
		[connectedNetwork, selectNetwork]
	);

	return <NetworkContext.Provider value={obj}>{children}</NetworkContext.Provider>;
};

export default NetworkProvider;
