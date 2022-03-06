import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import styles from './Buttons.styles';
import { ButtonsProps } from './Buttons.types';

const Buttons: React.FC<ButtonsProps> = ({ onPress }) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { borderTopColor: colors.background1 }]}>
			{['Buy', 'Sell', 'Send'].map((item) => (
				<TouchableOpacity
					key={item}
					style={[styles.button, { borderLeftColor: colors.background1 }]}
					{...{ onPress }}
				>
					<Text type="a">{item}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Buttons;
