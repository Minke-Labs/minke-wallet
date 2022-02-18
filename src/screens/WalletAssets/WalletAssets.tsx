import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';

import AssetList from './AssetList/AssetList';
import ValueBox from './ValueBox';

const WalletAssets = () => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				height: '100%',
				backgroundColor: colors.detail4
			}}
		>
			<ValueBox />
			<View
				style={{
					borderTopLeftRadius: 24,
					borderTopRightRadius: 24,
					flex: 1,
					backgroundColor: colors.background1
				}}
			>
				<AssetList />
			</View>
		</View>
	);
};

export default WalletAssets;
