/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Text, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from '@components';
import { IconType } from '@styles';

interface ButtonProps {
	title: string;
	iconLeft?: IconType;
	iconRight?: IconType;
	disabled?: boolean;
	mode?: string;
	marginBottom?: number;
	onPress?: () => void;
	alert?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	disabled = false,
	onPress
}) => {
	const handlePress = () => {
		Keyboard.dismiss();
		onPress!();
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={disabled}
			onPress={handlePress}
		>
			<View
				bg="cta1"
				br={9}
				h={40}
				main="center"
				cross="center"
			>
				<Text>Button</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Button;
