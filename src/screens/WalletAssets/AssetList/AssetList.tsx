import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { TokenType } from '@styles';
import Card from './Card';
import AssetHeader from './AssetHeader';
import AssetSelector from './AssetSelector';

const arr = [
	{
		coinName: 'Ethereum',
		coinSymbol: 'eth',
		walletBalance: 4.08543,
		walletBalanceUsd: 15.05876106,
		interest: 0.0,
		reward: 0.25,
		stablecoin: false
	},
	{
		coinName: 'Maker',
		coinSymbol: 'mkr',
		walletBalance: 1.2,
		walletBalanceUsd: 3.16747,
		interest: 0.0,
		reward: 0.25,
		stablecoin: false
	},
	{
		coinName: 'SNX',
		coinSymbol: 'snx',
		walletBalance: 60.87307,
		walletBalanceUsd: 598.63,
		interest: 4.91,
		stablecoin: false
	},
	{
		coinName: 'ChainLink',
		coinSymbol: 'link',
		walletBalance: 10.08679,
		walletBalanceUsd: 277.95,
		interest: 0.0,
		reward: 0.69,
		stablecoin: false
	},
	{
		coinName: 'DAI',
		coinSymbol: 'dai',
		walletBalance: 0.0,
		walletBalanceUsd: 0.0,
		interest: 2.98,
		reward: 1.14,
		stablecoin: true
	}
];

const AssetList = () => {
	const [active, setActive] = useState(0);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	// const onSelected = (item: typeof arr) => navigation.navigate('Assets', { coin: item });
	const onSelected = () => navigation.navigate('Assets');

	const filterArr = () => {
		if (active) return arr.filter((item) => item.stablecoin);
		return arr;
	};

	return (
		<View style={{ paddingTop: 32, height: '100%' }}>
			<AssetHeader />
			<AssetSelector {...{ active, setActive }} />
			<FlatList
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => `${item.coinSymbol}`}
				data={filterArr()}
				renderItem={({ item }) => (
					<Card
						key={item.coinSymbol}
						coinName={item.coinName}
						coinSymbol={item.coinSymbol as TokenType}
						walletBalance={item.walletBalance}
						walletBalanceUsd={item.walletBalanceUsd}
						interest={item.interest}
						reward={item.reward}
						onPress={() => onSelected()}
					/>
				)}
			/>
		</View>
	);
};

export default AssetList;
