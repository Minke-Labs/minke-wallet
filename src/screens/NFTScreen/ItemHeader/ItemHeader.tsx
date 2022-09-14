import React from 'react';
import { Image } from 'react-native';
import { View, Text } from '@components';
import { ItemHeaderProps } from './ItemHeader.types';
import styles from './ItemHeader.styles';

export const ItemHeader: React.FC<ItemHeaderProps> = ({ collection }) => (
	<View row cross="center" mb="xs">
		<Image source={{ uri: collection[0].collection.image_url }} style={styles.image} />
		<Text type="lMedium" weight="semiBold">
			{collection[0].collection.name}
		</Text>
	</View>
);
