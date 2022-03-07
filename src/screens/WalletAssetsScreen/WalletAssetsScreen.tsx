import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { Modal, ModalReusables } from '@components';
import { getWalletTokens, WalletToken } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import AssetList from './AssetList/AssetList';
import ValueBox from './ValueBox/ValueBox';
import AssetListEmpty from './AssetListEmpty/AssetListEmpty';
import styles from './WalletAssetsScreen.styles';

const WalletAssetsScreen = () => {
	const { colors } = useTheme();
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();
	const { address, balance } = globalWalletState().value;

	useEffect(() => {
		const getTokens = async () => {
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
		};
		getTokens();
	}, []);

	return (
		<>
			<View style={[styles.container, { backgroundColor: colors.detail4 }]}>
				<ValueBox {...{ balance }} />
				<View style={[styles.assetListContainer, { backgroundColor: colors.background1 }]}>
					{walletTokens && walletTokens.length > 0 ? (
						<AssetList walletTokens={walletTokens} />
					) : (
						<AssetListEmpty onPress={() => setAddFundsVisible(true)} />
					)}
				</View>
			</View>
			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<ModalReusables.ComingSoon onDismiss={() => setAddFundsVisible(false)} />
			</Modal>
		</>
	);
};

export default WalletAssetsScreen;
