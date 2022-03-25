import React from 'react';
import { Image, View } from 'react-native';
import { Text } from '@components';
import { whale2Img } from '@images';
import { styles } from './NoTokens.styles';

const NoTokens = () => (
	<View style={styles.container}>
		<Image source={whale2Img} style={styles.image} />
		<Text color="text4" weight="medium" marginBottom={16}>
			No tokens here
		</Text>
	</View>
);

export default NoTokens;
