import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Text, View } from '@components';
import { AssetsLayout } from '@layouts';
import { TokenItemCard } from './TokenItemCard/TokenItemCard';
import Selector from './Selector/Selector';

const StablecoinsScreen = () => {
	const [active, setActive] = useState(0);

	return (
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
						Stablecoins
					</Text>

					<Selector {...{ active, setActive }} />

					<TouchableOpacity onPress={() => null}>
						<View row>
							<Text type="lMedium" weight="semiBold" color="cta1" mb={3}>
								Get 3.26% annualized interest
							</Text>
							<Icon name="chevronRight" size={20} color="cta1" />
						</View>
					</TouchableOpacity>

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
};

export default StablecoinsScreen;
