import React from 'react';
import { useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const Button: React.FC<ButtonProps> = ({
	title = 'button',
	mode = 'contained',
	iconLeft,
	iconRight,
	disabled = false,
	onPress
}) => {
	const { colors } = useTheme();
	const color = mode === 'contained' ? colors.buttonText : colors.linkText;
	const backgroundColor = mode === 'contained' ? '#006AA6' : undefined;
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={disabled}
			onPress={onPress}
			style={[styles.button, { backgroundColor }]}
		>
			{iconLeft && <Icon name={iconLeft} />}
			<Text weight="medium" style={{ color }}>
				{title}
			</Text>
			{iconRight && <Icon name={iconRight} />}
		</TouchableOpacity>
	);
};

export default Button;
