import React from 'react';
import { View } from 'react-native';
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
		reward: 0.25
	},
	{
		coinName: 'Maker',
		coinSymbol: 'mkr',
		walletBalance: 1.2,
		walletBalanceUsd: 3.16747,
		interest: 0.0,
		reward: 0.25
	},
	{
		coinName: 'SNX',
		coinSymbol: 'snx',
		walletBalance: 60.87307,
		walletBalanceUsd: 598.63,
		interest: 4.91
	},
	{
		coinName: 'ChainLink',
		coinSymbol: 'link',
		walletBalance: 10.08679,
		walletBalanceUsd: 277.95,
		interest: 0.0,
		reward: 0.69
	},
	{
		coinName: 'DAI',
		coinSymbol: 'dai',
		walletBalance: 0.0,
		walletBalanceUsd: 0.0,
		interest: 2.98,
		reward: 1.14
	}
];

const AssetList = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	// const onSelected = (item: typeof arr) => navigation.navigate('Assets', { coin: item });
	const onSelected = () => navigation.navigate('Assets');

	return (
		<View style={{ paddingTop: 32 }}>
			<AssetHeader />
			<AssetSelector />
			{arr.map((item) => (
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
			))}
		</View>
	);
};

export default AssetList;
