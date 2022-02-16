import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';

const Buttons: React.FC<{ onPress: () => void }> = ({ onPress }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				borderTopWidth: 1,
				borderColor: 'fuschia',
				height: 51,
				flexDirection: 'row',
				borderTopColor: colors.background1
			}}
		>
			{['Buy', 'Sell', 'Send'].map((item) => (
				<TouchableOpacity
					key={item}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
						borderLeftWidth: 1,
						borderLeftColor: colors.background1
					}}
					{...{ onPress }}
				>
					<Text type="a">{item}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Buttons;
