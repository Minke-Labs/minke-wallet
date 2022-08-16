import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from '@components';
import { AssetsLayout } from '@layouts';
import { TokenItemCard } from './TokenItemCard/TokenItemCard';

const StablecoinsScreen = () => (
	<AssetsLayout
		headerValue="5000"
		headerTitle={
			<Text type="lLarge" weight="semiBold">
				Current value
			</Text>
		}
	>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View pl={3} pt={4}>
				<Text type="tSmall" weight="bold" mb={4}>
					StablecoinsScreen
				</Text>

				<View h={32} bg="alert3" mb={3} />

				<Text type="lMedium" weight="semiBold" color="cta1" mb={3}>
					Get 3.26% annualized interest
				</Text>

				<View pr={3}>
					<TokenItemCard
						token="eth"
						name="USD Coin"
						symbol="USDC"
						subtitle="All networks"
						rightValue="$1023.08"
						onPress={() => null}
					/>
					<TokenItemCard
						token="usdt"
						name="USD Tether"
						symbol="USDT"
						subtitle="All networks"
						rightValue="+ Buy"
						link
						onPress={() => null}
					/>
					<TokenItemCard
						token="dai"
						name="Dai"
						symbol="DAI"
						subtitle="All networks"
						rightValue="+ Buy"
						link
						onPress={() => null}
					/>
					<TokenItemCard
						token="bnb"
						name="Binance USD"
						symbol="BUSDc"
						subtitle="All networks"
						rightValue="+ Buy"
						link
						onPress={() => null}
					/>
				</View>

			</View>
		</ScrollView>
	</AssetsLayout>
);

export default StablecoinsScreen;
