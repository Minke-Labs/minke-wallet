import React from 'react';
import { View } from 'react-native';
import { useTheme, useTokens } from '@hooks';
import { Modal, ModalReusables } from '@components';
import { BasicLayout } from '@layouts';
import AssetList from './AssetList/AssetList';
import ValueBox from './ValueBox/ValueBox';
import AssetListEmpty from './AssetListEmpty/AssetListEmpty';
import styles from './WalletAssetsScreen.styles';

const WalletAssetsScreen = () => {
	const { colors } = useTheme();
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const { tokens, walletBalance: balance } = useTokens();

	return (
		<>
			<BasicLayout hideSafeAreaView bg="detail4">
				<ValueBox {...{ balance }} />
				<View style={[styles.assetListContainer, { backgroundColor: colors.background1 }]}>
					{tokens && tokens.length > 0 ? (
						<AssetList walletTokens={tokens} />
					) : (
						<AssetListEmpty onPress={() => setAddFundsVisible(true)} />
					)}
				</View>
			</BasicLayout>
			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<ModalReusables.ComingSoon onDismiss={() => setAddFundsVisible(false)} />
			</Modal>
		</>
	);
};

export default WalletAssetsScreen;
