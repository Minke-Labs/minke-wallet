import React from 'react';
import { Button, useTheme } from 'react-native-paper';

interface Props {
	children: any;
	onPress: Function;
	mode?: string;
	icon?: any;
	disabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ children, onPress, mode = 'contained', icon, disabled = false }: any) => {
	const { colors } = useTheme();
	const color = mode === 'contained' ? colors.buttonText : colors.linkText;
	const labelColor = disabled ? colors.disabled : color;

	return (
		<Button
			theme={{ roundness: 30 }}
			mode={mode}
			onPress={onPress}
			uppercase={false}
			labelStyle={{
				fontSize: 16,
				color: labelColor
			}}
			style={{
				alignSelf: 'stretch',
				padding: 10,
				backgroundColor: mode === 'contained' ? '#006AA6' : undefined
			}}
			icon={icon}
			contentStyle={{ flexDirection: 'row-reverse' }}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
