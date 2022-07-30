import { useNavigation } from '@hooks';
import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { nftsByCollection } from '@models/openSea';
import { ItemHeader } from '../ItemHeader/ItemHeader';

const styles = StyleSheet.create({
	image: {
		width: 56,
		height: 56,
		borderRadius: 8,
		marginRight: 8
	}
});

interface ItemProps {
	slug: string;
}

const Item: React.FC<ItemProps> = ({ slug }) => {
	const navigation = useNavigation();
	const nfts = nftsByCollection[slug];
	return (
		<View style={{ marginBottom: 24 }}>
			<ItemHeader slug={slug} />
			<View style={{ flexDirection: 'row' }}>

				<FlatList
					data={nfts}
					keyExtractor={(item) => item.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => navigation.navigate('NFTDetailScreen')}>
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
