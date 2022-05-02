import React from 'react';
import { View, Image, useColorScheme, SafeAreaView } from 'react-native';
import { Text } from '@components';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { useLanguage } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import Header from '../Header/Header';
import { ValueBoxProps } from './ValueBox.types';
import styles from './ValueBox.styles';

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

const ValueBox: React.FC<ValueBoxProps> = ({ balance, title }) => {
	const { i18n } = useLanguage();
	return (
		<Background>
			<Header title={title} />
			<View style={styles.textContainer}>
				<Text marginBottom={10}>{i18n.t('WalletAssetsScreen.ValueBox.current_value')}</Text>
				<Text weight="medium" type="textLarge" marginBottom={10}>
					{numberFormat(balance || 0)}
				</Text>
			</View>
		</Background>
	);
};

export default ValueBox;
