import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { ItemHeader } from '../ItemHeader/ItemHeader';

const styles = StyleSheet.create({
	image: {
		width: 56,
		height: 56,
		borderRadius: 8,
		marginRight: 8
	}
});

const images = [
	require('../mockImages/2.png'),
	require('../mockImages/3.png'),
	require('../mockImages/4.png'),
	require('../mockImages/5.png'),
	require('../mockImages/6.png'),
	require('../mockImages/7.png')
];

const Item = () => (
	<View style={{ marginBottom: 24 }}>
		<ItemHeader />
		<View style={{ flexDirection: 'row' }}>

			<FlatList
				data={images}
				keyExtractor={(item) => item.toString()}
				renderItem={({ item }) => (
					<Image
						style={styles.image}
						source={item}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>

		</View>
	</View>
);

export default Item;
