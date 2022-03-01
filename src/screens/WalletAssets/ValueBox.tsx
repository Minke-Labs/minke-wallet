import React from 'react';
import { View, StyleSheet, Image, useColorScheme, SafeAreaView } from 'react-native';
import { BigNumber } from 'ethers';
import { Text } from '@components';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { numberFormat } from '@helpers/utilities';
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

interface ValueBoxProps {
	title?: string;
	balance?: {
		eth?: BigNumber | undefined;
		usd?: string | undefined;
	};
}

const ValueBox: React.FC<ValueBoxProps> = ({ balance, title }) => (
	<Background>
		<Header title={title} />
		<View style={{ height: 207, alignItems: 'center' }}>
			<Text marginBottom={10}>Current value</Text>
			<Text weight="medium" style={{ fontSize: 48, lineHeight: 58 }}>
				{numberFormat(Number(balance?.usd) || 0)}
			</Text>
		</View>
	</Background>
);

export default ValueBox;
