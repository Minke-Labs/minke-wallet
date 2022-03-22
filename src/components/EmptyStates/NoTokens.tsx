import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@components';
import { whale2Img } from '@images';

const styles = StyleSheet.create({
	tableContainer: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 14
	},
	image: {
		width: 152,
		height: 152
	}
});

const NoTokens = () => (
	<View style={styles.tableContainer}>
		<Image source={whale2Img} style={styles.image} />
		<Text color="text4" weight="medium" marginBottom={16}>
			No tokens here
		</Text>
	</View>
);

export default NoTokens;
