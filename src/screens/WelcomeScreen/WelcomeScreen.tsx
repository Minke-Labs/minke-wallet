import React from 'react';
import { Text, View, Image } from 'react-native';
import { WelcomeTemplate } from '@templates';
import styles from './WelcomeScreen.styles';
import welcomeImg from '../../images/welcome.png';

const WelcomeScreen = () => (
	<WelcomeTemplate>
		<View style={styles.content}>
			<Image source={welcomeImg} style={styles.headerImage} />
		</View>
		<Text>WelcomeScreen</Text>
	</WelcomeTemplate>
);

export default WelcomeScreen;
