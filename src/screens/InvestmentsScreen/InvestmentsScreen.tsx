/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Text, View, TokenItemCard } from '@components';
import { AssetsLayout } from '@layouts';
import { useNavigation, useTokens } from '@hooks';
import { TokenType } from '@styles';
import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
	const { tokens, walletBalance: balance } = useTokens();

	const [active, setActive] = useState(0);
	const navigation = useNavigation();
	return (
		<AssetsLayout
			headerValue="5000"
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					Current value
				</Text>
			}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Text type="tSmall" weight="bold" mb="s">
						Investments
					</Text>

					<Selector {...{ active, setActive }} />

					<View pr="xs" mt="xs">

						{/* <FlatList
							showsVerticalScrollIndicator={false}
							keyExtractor={(item) => `${item.address}`}
							data={tokens}
							renderItem={({ item }) => (
								<TokenItemCard
									token={item.symbol as TokenType}
									name={item.name!}
									symbol="USDC"
									subtitle="All networks"
									rightValue="$1023.08"
									onPress={() => navigation.navigate('AssetDetailScreen')}
								/>
							)}
						/> */}

						<TokenItemCard
							token="polygon"
							name="Polygon"
							symbol="MATIC"
							subtitle="Polygon"
							rightValue="1023.08"
							rightBottom="$634.9375"
							perc={12.40}
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>

						<TokenItemCard
							token="eth"
							name="Ethereum"
							symbol="ETH"
							subtitle="Polygon"
							rightValue="2.28"
							rightBottom="$1028.9375"
							perc={-8.23}
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>

						<TokenItemCard
							token="aave"
							name="Aave"
							symbol="AAVE"
							subtitle="Polygon"
							perc={-8.23}
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>

					</View>

				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default InvestmentsScreen;
