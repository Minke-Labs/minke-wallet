import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { IconType } from '@styles';
import { Text, Icon } from '@components';
import styles from './WalletScreen.styles';

interface CardProps {
	name: IconType;
	icon: string;
}

const Card: React.FC<CardProps> = ({ name, icon }) => (
	<TouchableOpacity activeOpacity={0.6} style={styles.actionsPanelCardContainer}>
		<Icon size={20} name={icon as IconType} color="cta1" style={{ marginRight: 8 }} />
		<Text weight="medium" type="a">
			{name}
		</Text>
	</TouchableOpacity>
);

const arr = [
	{ name: 'Exchange', icon: 'exchangeStroke' },
	{ name: 'Receive', icon: 'sendStroke' },
	{ name: 'Copy address', icon: 'copyStroke' },
	{ name: 'New wallet', icon: 'walletStroke' },
	{ name: 'Switch accounts', icon: 'avatarStroke' }
];

const ActionsPanel = () => (
	<View style={styles.actionsPanelContainer}>
		<FlatList
			keyExtractor={(item, idx) => `${item.name}-${idx}`}
			data={arr}
			renderItem={({ item }) => <Card name={item.name as IconType} icon={item.icon} />}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	</View>
);

export default ActionsPanel;
