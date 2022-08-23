import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Text, View, TokenItemCard } from '@components';
import { AssetsLayout } from '@layouts';
import { useNavigation } from '@hooks';

const StablecoinsScreen = () => {
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
						Stablecoins
					</Text>

					<TouchableOpacity onPress={() => navigation.navigate('SaveScreen')}>
						<View row>
							<Text type="lMedium" weight="semiBold" color="cta1" mb="xs">
								Get 3.26% annualized interest
							</Text>
							<Icon name="chevronRight" size={20} color="cta1" />
						</View>
					</TouchableOpacity>

					<View pr="xs">
						<TokenItemCard
							token="eth"
							name="USD Coin"
							symbol="USDC"
							subtitle="All networks"
							rightValue="$1023.08"
							onPress={() => navigation.navigate('AssetDetailScreen')}
							paper
						/>
						<TokenItemCard
							token="usdt"
							name="USD Tether"
							symbol="USDT"
							subtitle="All networks"
							onPress={() => navigation.navigate('AssetDetailScreen')}
							paper
						/>
						<TokenItemCard
							token="dai"
							name="Dai"
							symbol="DAI"
							subtitle="All networks"
							onPress={() => navigation.navigate('AssetDetailScreen')}
							paper
						/>
						<TokenItemCard
							token="bnb"
							name="Binance USD"
							symbol="BUSDc"
							subtitle="All networks"
							onPress={() => navigation.navigate('AssetDetailScreen')}
							paper
						/>
					</View>

				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default StablecoinsScreen;
