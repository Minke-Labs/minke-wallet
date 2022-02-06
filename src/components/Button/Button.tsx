import React from 'react';
import { useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

type Colors = ReactNativePaper.ThemeColors;

const getKeyByValue = (object: Colors, value: string) =>
	Object.keys(object).find((key) => object[key as keyof Colors] === value) as keyof Colors;

const Button: React.FC<ButtonProps> = ({
	title = 'button',
	mode = 'contained',
	iconLeft,
	iconRight,
	disabled = false,
	marginBottom = 0,
	onPress
}) => {
	const { colors } = useTheme();
	const color = mode === 'contained' ? colors.buttonText : colors.linkText;
	const backgroundColor = () => {
		if (disabled) return colors.buttonDisabled;
		if (mode === 'contained') return colors.buttonColor;
		return 'transparent';
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={disabled}
			onPress={onPress}
			style={[styles.button, { backgroundColor: backgroundColor(), marginBottom }]}
		>
			{iconLeft && (
				<Icon name={iconLeft} size={18} style={{ marginRight: 9.25 }} color={getKeyByValue(colors, color)} />
			)}
			<Text weight="medium" style={{ color }}>
				{title}
			</Text>
			{iconRight && (
				<Icon name={iconRight} size={18} style={{ marginLeft: 9.25 }} color={getKeyByValue(colors, color)} />
			)}
		</TouchableOpacity>
	);
};

export default Button;
