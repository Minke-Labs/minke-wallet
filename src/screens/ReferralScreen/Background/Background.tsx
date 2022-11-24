import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import styles from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<View style={{ height: 296 }}>
			<Image
				resizeMode="cover"
				source={scheme === 'dark' ? walletAssetBackDarkImg : walletAssetBackImg}
				style={styles.container}
			/>
			{children}
		</View>
	);
};
