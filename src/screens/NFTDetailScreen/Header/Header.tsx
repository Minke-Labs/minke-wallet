import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import { useNavigation } from '@hooks';

export const Header: React.FC<{ title: string }> = ({ title }) => {
	const navigation = useNavigation();
	return (
		<View
			style={{
				width: '100%',
				paddingHorizontal: 16,
				marginBottom: 24
			}}
		>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<Icon name="chevronLeft" size={20} color="cta1" style={{ marginRight: 16 }} />
				<Text type="hMedium" weight="bold" style={{ width: 311 }}>
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
