import React from 'react';
import { View } from 'react-native';
import Card from './Card';
import AssetHeader from './AssetHeader';
import AssetSelector from './AssetSelector';

const AssetList = () => (
	<View style={{ paddingTop: 32 }}>
		<AssetHeader />
		<AssetSelector />
		{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
			<Card key={item} />
		))}
	</View>
);

export default AssetList;
