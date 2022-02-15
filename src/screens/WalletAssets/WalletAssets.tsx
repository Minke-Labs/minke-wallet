/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text } from '@components';
import { walletAssetBackImg } from '@images';
import Header from './Header';
import AssetList from './AssetList/AssetList';

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1
	},
	background: {
		position: 'absolute',
		right: 0
	}
});

const Background: React.FC = ({ children }) => (
	<View style={styles.backgroundContainer}>
		<Image source={walletAssetBackImg} style={styles.background} />
		{children}
	</View>
);

const ValueBox = () => (
	<Background>
		<View style={{ height: 207, alignItems: 'center', paddingTop: 64 }}>
			<Text marginBottom={10}>Current value</Text>
			<Text weight="medium" style={{ fontSize: 48, lineHeight: 58 }}>
				$200.00
			</Text>
		</View>
	</Background>
);

const WalletAssets = () => (
	<ScrollView showsVerticalScrollIndicator={false}>
		<Header />
		<ValueBox />
		<View
			style={{
				borderTopLeftRadius: 24,
				borderTopRightRadius: 24,
				backgroundColor: '#F2EAE1',
				height: '100%'
			}}
		>
			<AssetList />
		</View>
	</ScrollView>
);

export default WalletAssets;
