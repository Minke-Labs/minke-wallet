/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { getWalletTokens, WalletToken } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import AssetList from './AssetList/AssetList';
import ValueBox from './ValueBox';
import AssetListEmpty from './AssetListEmpty';

const WalletAssets = () => {
	const { colors } = useTheme();
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
		<View style={{ height: '100%', backgroundColor: colors.detail4 }}>
			<ValueBox {...{ balance }} />
			<View
				style={{
					borderTopLeftRadius: 24,
					borderTopRightRadius: 24,
					flex: 1,
					backgroundColor: colors.background1
				}}
			>
				{walletTokens && walletTokens.length > 0 ?
					<AssetList walletTokens={walletTokens} /> :
					<AssetListEmpty onPress={() => console.log('PRESSED!')} />}
			</View>
		</View>
	);
};

export default WalletAssets;
