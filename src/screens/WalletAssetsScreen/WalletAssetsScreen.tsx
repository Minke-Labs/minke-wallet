import React from 'react';
import { View } from 'react-native';
import { useNavigation, useTheme, useTokens } from '@hooks';
import { BlankStates } from '@components';
import { BasicLayout } from '@layouts';
import RNUxcam from 'react-native-ux-cam';
import AssetList from './AssetList/AssetList';
import ValueBox from './ValueBox/ValueBox';
import AssetListEmpty from './AssetListEmpty/AssetListEmpty';
import styles from './WalletAssetsScreen.styles';

const WalletAssetsScreen = () => {
	RNUxcam.tagScreenName('WalletAssetsScreen');
	const { colors } = useTheme();
	const navigation = useNavigation();
	const { tokens, walletBalance: balance } = useTokens();

	if (tokens === undefined) return <BlankStates.WalletAssets />;

	return (
		<BasicLayout hideSafeAreaView bg="detail4">
			<ValueBox {...{ balance }} />
			<View style={[styles.assetListContainer, { backgroundColor: colors.background1 }]}>
				{tokens.length > 0 ? (
					<AssetList walletTokens={tokens} />
				) : (
					<AssetListEmpty onPress={() => navigation.navigate('AddFundsScreen')} />
				)}
			</View>
		</BasicLayout>
	);
};

export default WalletAssetsScreen;
