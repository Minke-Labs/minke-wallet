import React from 'react';
import { Button, useTheme } from 'react-native-paper';

interface Props {
	children: any;
	onPress: Function;
	mode?: string;
	icon?: any;
}

const PrimaryButton: React.FC<Props> = ({ children, onPress, mode = 'contained', icon }: any) => {
	const { colors } = useTheme();
	return (
		<Button
			theme={{ roundness: 30 }}
			mode={mode}
			onPress={onPress}
			uppercase={false}
			labelStyle={{
				fontSize: 16,
				color: mode === 'contained' ? colors.buttonText : colors.linkText
			}}
			style={{
				alignSelf: 'stretch',
				padding: 10
			}}
			icon={icon}
			contentStyle={{ flexDirection: 'row-reverse' }}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
