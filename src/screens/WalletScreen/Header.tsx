import React, { useEffect } from 'react';
import { View, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
import { Text, Icon } from '@components';
// import { makeStyles } from '@src/components/Text/Text.styles';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import AppLoading from 'expo-app-loading';
// import { useTheme } from '@hooks';
import { useState } from '@hookstate/core';

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 24
	},
	iconsContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});

interface HeaderProps {
	onSettingsPress: (event: GestureResponderEvent) => void;
}

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

	if (state.promised) return <AppLoading />;

	return (
		<View style={styles.headerContainer}>
			<View>
				<Text type="a" weight="bold">
					Welcome ({state.value.network.name})
				</Text>
				<Text weight="extraBold" type="h3">
					{accountName()}
				</Text>
			</View>
			<View style={styles.iconsContainer}>
				<TouchableOpacity activeOpacity={0.6}>
					<Icon name="walletConnectStroke" style={{ marginRight: 21 }} size={20} color="text7" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6}>
					<Icon name="waveStroke" style={{ marginRight: 21 }} size={20} color="text7" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={onSettingsPress}>
					<Icon size={20} color="text7" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
