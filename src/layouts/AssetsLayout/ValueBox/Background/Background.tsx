import React from 'react';
import { Image, useColorScheme, SafeAreaView } from 'react-native';
import { waveDark, waveLight } from '@images';
import { styles } from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<SafeAreaView style={styles.container}>
			<Image
				resizeMode="cover"
				source={scheme === 'dark' ? waveDark : waveLight}
				style={styles.image}
			/>
			{children}
		</SafeAreaView>
	);
};
