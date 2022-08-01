import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';
import { ItemHeaderProps } from './ItemHeader.types';
import styles from './ItemHeader.styles';

export const ItemHeader: React.FC<ItemHeaderProps> = ({ collection }) => (
	<View style={styles.container}>
		<Image
			source={{ uri: collection[0].collection.image }}
			style={styles.image}
		/>
		<Text
			type="lMedium"
			weight="semiBold"
		>
			{collection[0].collection.name}
		</Text>
	</View>
);
