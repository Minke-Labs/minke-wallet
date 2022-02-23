import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { coinParamFromSymbol } from '@helpers/utilities';
import { RootStackParamList } from '@src/routes/types.routes';
import { TokenType } from '@styles';
import { WalletToken } from '@models/wallet';
import Card from './Card';
import AssetHeader from './AssetHeader';
import AssetSelector from './AssetSelector';

interface AssetListProps {
	walletTokens: WalletToken[];
}

const stablecoins = ['USDT', 'DAI', 'BUSD', 'TUSD', 'USDC', 'UST', 'DGX'];

const AssetList: React.FC<AssetListProps> = ({ walletTokens }) => {
	const [active, setActive] = React.useState(0);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onSelected = (coin: WalletToken) => navigation.navigate('Assets', { coin });

	const filterByStablecoin = () => {
		if (active) return walletTokens.filter((item) => stablecoins.includes(item.symbol));
		return walletTokens;
	};

	return (
		<View style={{ paddingTop: 32, height: '100%' }}>
			<AssetHeader />
			<AssetSelector {...{ active, setActive }} />
			<FlatList
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => `${item.address}`}
				data={filterByStablecoin()}
				renderItem={({ item }) => (
					<Card
						key={item.address}
						coinName={coinParamFromSymbol({ symbol: item.symbol, type: 'name' }) || ''}
						coinSymbol={item.symbol.toLowerCase() as TokenType}
						walletBalance={Number(item.balance.toFixed(5))}
						walletBalanceUsd={item.balanceUSD}
						interest={0}
						reward={0}
						onPress={() => onSelected(item)}
					/>
				)}
			/>
		</View>
	);
};

export default AssetList;
