import { useNavigation } from '@hooks';
import React from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { ItemHeader } from '../ItemHeader/ItemHeader';
import styles from './Item.styles';
import { ItemProps } from './Item.types';

const Item: React.FC<ItemProps> = ({ collection }) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<ItemHeader collection={collection} />
			<View style={styles.body}>
				<FlatList
					data={collection}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => navigation.navigate('NFTDetailScreen', { nft: item })}>
							<Image
								style={styles.image}
								source={{ uri: item.thumb }}
							/>
						</TouchableOpacity>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export default Item;
