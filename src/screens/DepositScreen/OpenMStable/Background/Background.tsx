import React from 'react';
import { Image, useColorScheme, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mStableLogo } from '@images';
import styles from '../OpenMStable.styles';

const lightColors = ['rgba(244, 236, 229, 1)', 'rgba(230, 231, 235, 1)', 'rgba(99, 153, 226, 1)'];
const darkColors = ['rgba(10, 33, 56, 1)', 'rgba(10, 40, 73, 1)', 'rgba(5, 73, 160, 1)'];

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	const colors = scheme === 'dark' ? darkColors : lightColors;
	return (
		<View style={{ flex: 1, backgroundColor: scheme === 'dark' ? '#4540687d' : '#F5F5F5' }}>
			<LinearGradient colors={colors} style={{ flex: 1 }} start={{ x: 0.7, y: 0 }} />
			<Image source={mStableLogo} style={styles.aaveGhost} />
			{children}
		</View>
	);
};
