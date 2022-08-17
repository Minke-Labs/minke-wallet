import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from '@components';
import { AssetsLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { TokenItemCard } from './TokenItemCard/TokenItemCard';
import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
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
				<View pl={3} pt={4}>
					<Text type="tSmall" weight="bold" mb={4}>
						Investments
					</Text>

					<Selector {...{ active, setActive }} />

					<View pr={3} mt={3}>
						<TokenItemCard
							token="eth"
							name="USD Coin"
							symbol="USDC"
							subtitle="All networks"
							rightValue="$1023.08"
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>
						<TokenItemCard
							token="usdt"
							name="USD Tether"
							symbol="USDT"
							subtitle="All networks"
							rightValue="+ Buy"
							link
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>
						<TokenItemCard
							token="dai"
							name="Dai"
							symbol="DAI"
							subtitle="All networks"
							rightValue="+ Buy"
							link
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>
						<TokenItemCard
							token="bnb"
							name="Binance USD"
							symbol="BUSDc"
							subtitle="All networks"
							rightValue="+ Buy"
							link
							onPress={() => navigation.navigate('AssetDetailScreen')}
						/>
					</View>

				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default InvestmentsScreen;
