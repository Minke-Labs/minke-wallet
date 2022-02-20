/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { getWalletTokens, WalletToken } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import AssetList from './AssetList/AssetList';
import ValueBox from './ValueBox';

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

	// console.log('\n\n\n');
	// console.log('TOKENS: ', walletTokens);

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
				{walletTokens && walletTokens.length > 0 && <AssetList walletTokens={walletTokens} />}
			</View>
		</View>
	);
};

export default WalletAssets;
