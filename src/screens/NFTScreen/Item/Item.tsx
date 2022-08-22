import { useNavigation } from '@hooks';
import { whale2Img } from '@images';
import React from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
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
					renderItem={({ item }) => {
						const { image_thumbnail_url: thumb, image_original_url: original, image_url: imageUrl } = item;
						const image = thumb || imageUrl || original;

						return (
							<TouchableOpacity onPress={() => navigation.navigate('NFTDetailScreen', { nft: item })}>
								{image ? (
									image.endsWith('.svg') ? (
										<View style={{ borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
											<SvgUri uri={image} width={56} height={56} />
										</View>
									) : (
										<Image source={{ uri: image }} style={styles.image} />
									)
								) : (
									<Image source={whale2Img} style={styles.image} />
								)}
							</TouchableOpacity>
						);
					}}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export default Item;
