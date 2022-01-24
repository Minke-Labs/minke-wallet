import React from 'react';
import { useState } from '@hookstate/core';
import { Button, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalWalletState } from '@stores/WalletStore';
import { Network, networks, networkSettingsKey } from '@models/network';

export const ChangeNetwork = () => {
	const [visible, setVisible] = React.useState(false);
	const state = useState(globalWalletState());
	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	const selectNetwork = async (network: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, network.id);
			state.network.set(network);
		} catch (e) {
			console.error('Error saving settings');
		}
		closeMenu();
	};
	return (
		<Menu visible={visible} onDismiss={closeMenu} anchor={<Button onPress={openMenu}>Change network</Button>}>
			{Object.values(networks).map((network) => (
				<Menu.Item onPress={() => selectNetwork(network)} title={network.name} key={network.id} />
			))}
		</Menu>
	);
};
