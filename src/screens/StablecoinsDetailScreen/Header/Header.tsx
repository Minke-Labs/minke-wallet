import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from '@components';

interface HeaderProps {
	onPress: () => void;
	title: string;
	symbol?: string;
}

export const Header: React.FC<HeaderProps> = ({ onPress, title, symbol }) => (
	<TouchableOpacity onPress={onPress}>
		<View row cross="center" mb="s">
			<Icon name="chevronLeft" size={24} color="cta1" />
			<View mr="xxs" />
			<Text type="tSmall" weight="bold">
				{title}
			</Text>
			<View mr="xxs" />
			<Text type="bSmall" color="text2">
				{symbol}
			</Text>
		</View>
	</TouchableOpacity>
);
