import React from 'react';
import { View } from 'react-native';
import { useTheme, useTokens } from '@hooks';
import { Modal } from '@components';
import { AddFunds } from '@containers';
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
			<View style={[styles.container, { backgroundColor: colors.detail4 }]}>
				<ValueBox {...{ balance }} />
				<View style={[styles.assetListContainer, { backgroundColor: colors.background1 }]}>
					{tokens && tokens.length > 0 ? (
						<AssetList walletTokens={tokens} />
					) : (
						<AssetListEmpty onPress={() => setAddFundsVisible(true)} />
					)}
				</View>
			</View>
			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</Modal>
		</>
	);
};

export default WalletAssetsScreen;
