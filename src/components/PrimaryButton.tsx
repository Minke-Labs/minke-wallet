import React from 'react';
import { StyleProp, ButtonProps } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface Props {
	children: any;
	onPress?: Function;
	mode?: string;
	icon?: any;
	disabled?: boolean;
	style?: StyleProp<ButtonProps>;
}

const PrimaryButton: React.FC<Props> = ({
	children,
	onPress,
	mode = 'contained',
	icon,
	style = {},
	disabled = false
}: any) => {
	const { colors } = useTheme();
	const color = mode === 'contained' ? colors.buttonText : colors.linkText;
	// eslint-disable-next-line no-nested-ternary
	const backgroundColor = disabled ? colors.disabled : mode === 'contained' ? '#006AA6' : undefined;

	return (
		<Button
			theme={{ roundness: 30 }}
			mode={mode}
			onPress={onPress}
			uppercase={false}
			labelStyle={{
				fontSize: 16,
				color
			}}
			style={[
				style,
				{
					alignSelf: 'stretch',
					padding: 10,
					backgroundColor
				}
			]}
			icon={icon}
			contentStyle={{ flexDirection: 'row-reverse' }}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
