import React from 'react';
import { View, Image, useColorScheme, Text as NText } from 'react-native';
import { WelcomeTemplate } from '@templates';
import { welcomeImg, waveWelcomeHeaderDarkImg, waveWelcomeHeaderImg } from '@images';
import { Text } from '@components';
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
				<View style={styles.textContainer}>
					<Text fontWeight="extraBold" fontType="h1" width={273} marginBottom={16}>
						Wave goodbye to your bank!
					</Text>
					<Text fontColor="placeholder" width={198} marginBottom={16}>
						Easily save, spend and invest with
						<NText style={styles.textBold}> Minke </NText>
					</Text>
				</View>
			</View>
		</WelcomeTemplate>
	);
};

export default WelcomeScreen;
