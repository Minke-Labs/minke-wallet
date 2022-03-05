import React from 'react';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native';
import styles from './styles';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ children, active, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: active ? colors.text8 : 'transparent',
					borderColor: active ? colors.text10 : colors.detail4
				}
			]}
			activeOpacity={0.6}
			onPress={onPress}
		>
			<Text type="a" weight="medium">
				{children}
			</Text>
		</TouchableOpacity>
	);
};
