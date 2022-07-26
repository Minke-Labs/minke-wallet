import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';

export const ItemHeader = () => (
	<View style={{
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16
	}}
	>
		<Image
			source={require('../mockImages/1.png')}
			style={{
				width: 32,
				height: 32,
				borderRadius: 16,
				marginRight: 8
			}}
		/>
		<Text type="lMedium" weight="semiBold">Doodles</Text>
	</View>
);
