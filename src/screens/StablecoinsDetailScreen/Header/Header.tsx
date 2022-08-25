import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from '@components';

interface HeaderProps {
	onPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View row cross="flex-end" mb="s">
			<Icon name="chevronLeft" size={24} color="cta1" />
			<View mr="xxs" />
			<Text type="tSmall" weight="bold">
				USD Coin
			</Text>
			<View mr="xxs" />
			<Text type="bSmall" color="text2">
				USDC
			</Text>
		</View>
	</TouchableOpacity>
);
