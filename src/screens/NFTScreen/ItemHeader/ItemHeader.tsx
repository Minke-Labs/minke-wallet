import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';
import { getCollectionBySlug } from '@models/openSea';

interface ItemHeaderProps {
	slug: string;
}

export const ItemHeader: React.FC<ItemHeaderProps> = ({ slug }) => (
	<View style={{
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16
	}}
	>
		<Image
			source={{ uri: getCollectionBySlug(slug).image }}
			style={{
				width: 32,
				height: 32,
				borderRadius: 16,
				marginRight: 8
			}}
		/>
		<Text type="lMedium" weight="semiBold">{getCollectionBySlug(slug).name}</Text>
	</View>
);
