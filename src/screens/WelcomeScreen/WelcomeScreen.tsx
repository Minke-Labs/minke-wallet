import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { WelcomeTemplate } from '@templates';
import { welcomeImg, waveWelcomeHeaderDarkImg, waveWelcomeHeaderImg } from '@images';
import styles from './WelcomeScreen.styles';

const WelcomeScreen = () => {
	const scheme = useColorScheme();

	return (
		<WelcomeTemplate>
			<View style={styles.content}>
				<Image source={welcomeImg} style={styles.headerImage} />
				<Image
					source={scheme === 'dark' ? waveWelcomeHeaderDarkImg : waveWelcomeHeaderImg}
					style={styles.backgroundTop}
				/>
			</View>
		</WelcomeTemplate>
	);
};

export default WelcomeScreen;
