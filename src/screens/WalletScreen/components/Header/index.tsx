import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, ScreenLoadingIndicator } from '@components';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { useState } from '@hookstate/core';
import styles from './styles';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ onSettingsPress }) => {
	const [ensName, setEnsName] = React.useState<string | null>('');
	const state = useState(globalWalletState());
	const { address } = state.value;

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};

		fetchENSAddress();
	}, []);

	const accountName = () => {
		if (ensName) {
			return ensName;
		}
		return smallWalletAddress(address);
	};

	if (state.promised) return <ScreenLoadingIndicator />;

	return (
		<View style={styles.headerContainer}>
			<View>
				<Text type="a" weight="bold">
					Welcome
				</Text>
				<Text weight="extraBold" type="h3">
					{accountName()}
				</Text>
			</View>
			<View style={styles.iconsContainer}>
				{/* <TouchableOpacity activeOpacity={0.6}>
					<Icon name="walletConnectStroke" style={{ marginRight: 21 }} size={20} color="text7" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6}>
					<Icon name="waveStroke" style={{ marginRight: 21 }} size={20} color="text7" />
				</TouchableOpacity> */}
				<TouchableOpacity activeOpacity={0.6} onPress={onSettingsPress}>
					<Icon size={20} color="text7" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
