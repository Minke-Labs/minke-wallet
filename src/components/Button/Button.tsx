import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { spacing, ColorType } from '@styles';
import View from '../View/View';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
	title = 'button',
	mode = 'contained',
	disabled = false,
	iconLeft,
	iconRight,
	marginBottom = 0,
	br = 4,
	alert,
	onPress
}) => {
	const color = alert ? 'alert1' : (disabled || mode === 'contained') ? 'text11' : 'text7';
	const chosenMode = disabled ? 'contained' : mode;

	const { borderColor, borderWidth } =
	(chosenMode === 'outlined' || alert)
		? { borderColor: color, borderWidth: 1 }
		: { borderColor: 'transparent', borderWidth: 0 };

	const backgroundColor = () => {
		if (disabled) return 'detail2';
		if (alert) return 'transparent';
		if (chosenMode === 'contained') return 'cta1';
		return 'transparent';
	};

	const handlePress = () => {
		Keyboard.dismiss();
		onPress!();
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={disabled}
			onPress={handlePress}
			style={{ width: '100%', height: 40, flexDirection: 'row', marginBottom }}
		>
			<View
				br={br}
				bgc={backgroundColor()}
				w="100%"
				h="100%"
				row
				main="center"
				cross="center"
				bw={borderWidth}
				bc={borderColor as keyof ColorType}
			>
				{iconLeft && (
					<Icon
						name={iconLeft}
						size={18}
						style={{ marginRight: spacing[2] }}
						color={color}
					/>
				)}
				<Text
					type="lMedium"
					weight="semiBold"
					color={color}
				>
					{title}
				</Text>
				{iconRight && (
					<Icon
						name={iconRight}
						size={18}
						style={{ marginRight: spacing[2] }}
						color={color}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default Button;
