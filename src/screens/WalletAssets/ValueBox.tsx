import React from 'react';
import { View, StyleSheet, Image, useColorScheme, SafeAreaView } from 'react-native';
import { Text } from '@components';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import Header from './Header';

const styles = StyleSheet.create({
	backgroundContainer: {
		height: 277
	},
	background: {
		position: 'absolute',
		width: '100%'
	}
});

const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<SafeAreaView style={styles.backgroundContainer}>
			<Image
				resizeMode="cover"
				source={scheme === 'dark' ? walletAssetBackDarkImg : walletAssetBackImg}
				style={styles.background}
			/>
			{children}
		</SafeAreaView>
	);
};

const ValueBox = () => (
	<Background>
		<Header />
		<View style={{ height: 207, alignItems: 'center' }}>
			<Text marginBottom={10}>Current value</Text>
			<Text weight="medium" style={{ fontSize: 48, lineHeight: 58 }}>
				$200.00
			</Text>
		</View>
	</Background>
);

export default ValueBox;
