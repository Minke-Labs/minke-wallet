import React from 'react';
import { useState } from '@hookstate/core';
import { Button, Menu } from 'react-native-paper';
import { globalWalletState } from '@stores/WalletStore';

export const ChangeNetwork = () => {
	const [visible, setVisible] = React.useState(false);
	const state = useState(globalWalletState());
	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	const selectNetwork = (network: string) => {
		state.network.set(network);
		closeMenu();
	};
	return (
		<Menu visible={visible} onDismiss={closeMenu} anchor={<Button onPress={openMenu}>Change network</Button>}>
			<Menu.Item onPress={() => selectNetwork('matic')} title="Mainnet" />
			<Menu.Item onPress={() => selectNetwork('maticmum')} title="Mumbai" />
		</Menu>
	);
};
