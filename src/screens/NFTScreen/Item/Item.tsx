import React from 'react';
import { Image, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { View, Touchable } from '@components';
import { whale2Img } from '@images';
import { useNavigation } from '@hooks';
import { ItemHeader } from '../ItemHeader/ItemHeader';
import styles from './Item.styles';
import { ItemProps } from './Item.types';

const Item: React.FC<ItemProps> = ({ collection }) => {
	const navigation = useNavigation();
	return (
		<View mb="s">
			<ItemHeader collection={collection} />
			<View row>
				<FlatList
					data={collection}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						const {
							image_thumbnail_url: thumb,
							image_original_url: original,
							image_url: imageUrl
						} = item;
						const image = thumb || imageUrl || original;

						return (
							<Touchable onPress={() => navigation.navigate('NFTDetailScreen', { nft: item })}>
								{image ? (
									image.endsWith('.svg') ? (
										<View mr="xxs" br="xxs" style={{ overflow: 'hidden' }}>
											<SvgUri uri={image} width={56} height={56} />
										</View>
									) : (
										<Image source={{ uri: image }} style={styles.image} />
									)
								) : (
									<Image source={whale2Img} style={styles.image} />
								)}
							</Touchable>
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
