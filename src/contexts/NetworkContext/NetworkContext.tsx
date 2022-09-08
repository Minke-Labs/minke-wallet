import React, { useState, createContext, useMemo, useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTokensAndBalances } from '@stores/WalletStore';
import { Network, network as selectedNetwork, networkSettingsKey } from '@models/network';
import Logger from '@utils/logger';
import useWalletState from '../../hooks/useWalletState';

export const NetworkContext = createContext<any>(null);

const NetworkProvider: React.FC = ({ children }) => {
	const [connectedNetwork, setConnectedNetwork] = useState<Network>();
	const { state } = useWalletState();
	const { network, address } = state.value;

	const selectNetwork = async (ntw: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, ntw.id);
			setConnectedNetwork(ntw);
			const { balance } = await fetchTokensAndBalances(address);
			state.merge({ network: ntw, balance, transactions: undefined });
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
