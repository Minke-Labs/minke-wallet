import React, { createContext, useMemo, useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Network, network as selectedNetwork, networkSettingsKey } from '@models/network';
import Logger from '@utils/logger';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { fetchDepositProtocol } from '@models/deposit';

export const NetworkContext = createContext<any>(null);

const NetworkProvider: React.FC = ({ children }) => {
	const [connectedNetwork, setConnectedNetwork] = React.useState<Network>();
	const state = useState(globalWalletState());
	const { network } = state.value;
	const depositState = useState(globalDepositState());

	const selectNetwork = async (ntw: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, ntw.id);
			setConnectedNetwork(ntw);
			const protocol = await fetchDepositProtocol();
			depositState.merge(protocol);
			state.merge({ network: ntw, transactions: undefined });
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
