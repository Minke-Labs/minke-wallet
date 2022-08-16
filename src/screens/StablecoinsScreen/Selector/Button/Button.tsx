import React from 'react';
import { Text, View } from '@components';
import { useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ children, active, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={onPress}>
			<View
				bg={active ? 'text6' : 'transparent'}
				ph={3}
				br={4}
				bw={1}
				mr={2}
				h={32}
				main="center"
				cross="center"
				style={{
					flex: 0,
					alignSelf: 'center',
					borderColor: colors.text11
				}}
			>
				<Text
					type="lMedium"
					weight="semiBold"
					color={active ? 'text1' : 'text3'}
				>
					{children}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
