import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import {
	waveWelcomeHeaderImg,
	waveWelcomeHeaderDarkImg,
	waveWelcomeFooterImg,
	waveWelcomeFooterDarkImg
} from '@images';
import styles from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<View style={styles.container}>
			<Image
				source={scheme === 'dark' ? waveWelcomeHeaderDarkImg : waveWelcomeHeaderImg}
				style={styles.top}
			/>
			<Image
				source={scheme === 'dark' ? waveWelcomeFooterDarkImg : waveWelcomeFooterImg}
				style={styles.bottom}
			/>
			{children}
		</View>
	);
};
