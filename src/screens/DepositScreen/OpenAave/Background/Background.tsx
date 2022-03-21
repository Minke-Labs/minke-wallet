import React from 'react';
import { Image, useColorScheme, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { aaveGhost } from '@images';
import styles from '../OpenAave.styles';

const lightColors = ['rgba(223, 191, 206, 1)', 'rgba(143, 204, 208, 1)'];
const darkColors = ['rgba(64, 63, 98, 1)', 'rgba(48, 131, 151, 1)'];

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	const colors = scheme === 'dark' ? darkColors : lightColors;
	return (
		<View style={{ flex: 1, backgroundColor: scheme === 'dark' ? '#4540687d' : '#F5F5F5' }}>
			<LinearGradient colors={colors} style={{ flex: 1 }} start={{ x: 0.7, y: 0 }} />
			<Image source={aaveGhost} style={styles.aaveGhost} />
			{children}
		</View>
	);
};
