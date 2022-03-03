import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, GestureResponderEvent } from 'react-native';
import { IconType } from '@styles';
import { useTheme } from '@hooks';
import { Text, Icon } from '@components';

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
	{ name: 'Send', icon: 'sendStroke' },
	{ name: 'Exchange', icon: 'exchangeStroke' },
	{ name: 'Receive', icon: 'receiveStroke' },
	{ name: 'Copy address', icon: 'copyStroke' }
	// { name: 'New wallet', icon: 'walletStroke' },
	// { name: 'Switch accounts', icon: 'avatarStroke' },
	// { name: 'Delete wallet', icon: 'closeStroke' }
];

interface ActionsPanelProps {
	setSendModalOpen: () => void;
	onCreateWallet: (event: GestureResponderEvent) => void;
	onDeleteWallet: (event: GestureResponderEvent) => void;
	onExchange: (event: GestureResponderEvent) => void;
	onSwitchAccounts: (event: GestureResponderEvent) => void;
	showReceive: (event: GestureResponderEvent) => void;
	onCopyToClipboard: (event: GestureResponderEvent) => void;
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
	setSendModalOpen,
	onCreateWallet,
	onDeleteWallet,
	onExchange,
	onSwitchAccounts,
	showReceive,
	onCopyToClipboard
}) => {
	const chooseFnc = (name: string) => {
		switch (name) {
			case 'Send':
				return setSendModalOpen;
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
