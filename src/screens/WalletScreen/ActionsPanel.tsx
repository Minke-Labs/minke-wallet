/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, GestureResponderEvent } from 'react-native';
import { IconType } from '@styles';
import { useTheme } from '@hooks';
import { Text, Icon } from '@components';
import * as Clipboard from 'expo-clipboard';
import { globalWalletState } from '../../stores/WalletStore';

const styles = StyleSheet.create({
	actionsPanelContainer: {
		marginBottom: 32 + 51
	},
	actionsPanelCardContainer: {
		height: 48,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		paddingHorizontal: 16,
		alignSelf: 'center',
		marginRight: 12
	}
});

interface CardProps {
	icon: IconType;
	name: string;
	onPress: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({ name, icon, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[
				styles.actionsPanelCardContainer,
				{
					backgroundColor: colors.background2
				}
			]}
			onPress={onPress}
		>
			<Icon size={20} name={icon as IconType} color="cta1" style={{ marginRight: 8 }} />
			<Text weight="medium" type="a">
				{name}
			</Text>
		</TouchableOpacity>
	);
};

const arr = [
	{ name: 'Exchange', icon: 'exchangeStroke' },
	{ name: 'Receive', icon: 'sendStroke' },
	{ name: 'Copy address', icon: 'copyStroke' },
	{ name: 'New wallet', icon: 'walletStroke' },
	{ name: 'Switch accounts', icon: 'avatarStroke' },
	{ name: 'Delete wallet', icon: 'closeStroke' }
];

interface ActionsPanelProps {
	onCreateWallet: (event: GestureResponderEvent) => void;
	onDeleteWallet: (event: GestureResponderEvent) => void;
	onExchange: (event: GestureResponderEvent) => void;
	onSwitchAccounts: (event: GestureResponderEvent) => void;
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
	onCreateWallet,
	onDeleteWallet,
	onExchange,
	onSwitchAccounts
}) => {
	const [receiveVisible, setReceiveVisible] = useState(false);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const showReceive = () => setReceiveVisible(true);
	const hideReceive = () => setReceiveVisible(false);
	const wallet = globalWalletState();

	const onCopyToClipboard = () => {
		Clipboard.setString(wallet.value.address || '');
		setSnackbarVisible(true);
	};

	const chooseFnc = (name: string) => {
		switch (name) {
			case 'Exchange':
				return onExchange;
			case 'Receive':
				return showReceive;
			case 'Copy address':
				return onCopyToClipboard;
			case 'New wallet':
				return onCreateWallet;
			case 'Switch accounts':
				return onSwitchAccounts;
			case 'Delete wallet':
				return onDeleteWallet;
			default:
				return () => {};
		}
	};

	return (
		<View style={styles.actionsPanelContainer}>
			<FlatList
				keyExtractor={(item, idx) => `${item.name}-${idx}`}
				data={arr}
				renderItem={({ item }) => (
					<Card onPress={chooseFnc(item.name)} name={item.name} icon={item.icon as IconType} />
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default ActionsPanel;
