import React from 'react';
import { View, Image, useColorScheme, SafeAreaView } from 'react-native';
import { Text } from '@components';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { numberFormat } from '@helpers/utilities';
import Header from '../Header';
import styles from './styles';
import { ValueBoxProps } from './types';

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
				{numberFormat(Number(balance?.usd) || 0)}
			</Text>
		</View>
	</Background>
);

export default ValueBox;
