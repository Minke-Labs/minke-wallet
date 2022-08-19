import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from '@components';

interface HeaderProps {
	onPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPress }) => (
	<View row cross="center" mb="s">
		<TouchableOpacity onPress={onPress}>
			<Icon name="chevronLeft" size={24} color="cta1" />
		</TouchableOpacity>
		<View mr="xxs" />
		<Text type="tSmall" weight="bold">
			USD Coin
		</Text>
		<View mr="xxs" />
		<Text type="bSmall" color="text2">
			USDC
		</Text>
	</View>
);
