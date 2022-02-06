import React from 'react';
import { useTheme } from '@hooks';
import { ColorType } from '@styles';
import { TouchableOpacity } from 'react-native';

import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const getKeyByValue = (object: ColorType, value: string) =>
	Object.keys(object).find((key) => object[key as keyof ColorType] === value) as keyof ColorType;

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
	const color = mode === 'contained' ? colors.text6 : colors.text7;
	const backgroundColor = () => {
		if (disabled) return colors.detail2;
		if (mode === 'contained') return colors.cta1;
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
