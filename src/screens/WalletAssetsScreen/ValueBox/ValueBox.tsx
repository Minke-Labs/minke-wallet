import React from 'react';
import { View, Image, useColorScheme, SafeAreaView } from 'react-native';
import { Text } from '@components';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { numberFormat } from '@helpers/utilities';
import Header from '../Header/Header';
import styles from './ValueBox.styles';
import { ValueBoxProps } from './ValueBox.types';

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

const ValueBox: React.FC<ValueBoxProps> = ({ balance, title }) => (
	<Background>
		<Header title={title} />
		<View style={styles.textContainer}>
			<Text marginBottom={10}>Current value</Text>
			<Text weight="medium" type="textLarge">
				{numberFormat(balance || 0)}
			</Text>
		</View>
	</Background>
);

export default ValueBox;
