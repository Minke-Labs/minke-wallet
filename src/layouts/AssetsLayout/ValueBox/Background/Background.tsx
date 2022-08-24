import React from 'react';
import { Image, useColorScheme, SafeAreaView } from 'react-native';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { styles } from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<SafeAreaView style={styles.container}>
			<Image
				resizeMode="cover"
				source={scheme === 'dark' ? walletAssetBackDarkImg : walletAssetBackImg}
				style={styles.image}
			/>
			{children}
		</SafeAreaView>
	);
};
