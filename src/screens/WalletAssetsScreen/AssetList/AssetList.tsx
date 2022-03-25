import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@hooks';
import { TokenType } from '@styles';
import { MinkeToken, stablecoins } from '@models/token';
import NoTokens from '@src/components/EmptyStates/NoTokens';
import Card from './Card/Card';
import Header from './Header/Header';
import Selector from './Selector/Selector';
import { AssetListProps } from './AssetList.types';
import styles from './AssetList.styles';

const AssetList: React.FC<AssetListProps> = ({ walletTokens }) => {
	const [active, setActive] = React.useState(0);
	const navigation = useNavigation();

	const onSelected = (coin: MinkeToken) => navigation.navigate('AssetsScreen', { coin });

	let tokens = walletTokens;
	if (active) tokens = walletTokens.filter((item) => stablecoins.includes(item.symbol));

	return (
		<View style={styles.container}>
			<Header />
			<Selector {...{ active, setActive }} />
			{tokens.length > 0 ? (
				<FlatList
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => `${item.address}`}
					data={tokens}
					renderItem={({ item }) => (
						<Card
							key={item.address}
							coinName={item.name}
							coinSymbol={item.symbol as TokenType}
							walletBalance={item.balance}
							walletBalanceUsd={item.balanceUSD}
							onPress={() => onSelected(item)}
						/>
					)}
				/>
			) : (
				<NoTokens />
			)}
		</View>
	);
};

export default AssetList;
