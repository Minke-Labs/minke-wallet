import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Paper, View, Text, TokenItemCard } from '@components';
import { useNavigation } from '@hooks';

export const AccountsOverview = () => {
	const navigation = useNavigation();
	return (
		<Paper pt="xs" ph="xs" mb="xs">
			<Text type="lLarge" weight="semiBold" mb="xs">
				Accounts overview
			</Text>

			<View row cross="center" mb="xs">
				<Text type="lSmall" weight="semiBold" color="text2">
					Stablecoins
				</Text>
				<View mr="xxs" />
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('StablecoinsScreen')}>
					<Text type="bSmall" color="cta1">
						See all
					</Text>
				</TouchableOpacity>
			</View>

			<TokenItemCard
				token="usdc"
				name="USD Coin"
				symbol="USDC"
				subtitle="All networks"
				rightValueUSD={1023.08}
			/>

			<View row cross="center" mb="xs">
				<Text type="lSmall" weight="semiBold" color="text2">
					Investments highlights
				</Text>
				<View mr="xxs" />
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('InvestmentsScreen')}>
					<Text type="bSmall" color="cta1">
						See all
					</Text>
				</TouchableOpacity>
			</View>

			<TokenItemCard
				token="eth"
				name="USD Coin"
				symbol="USDC"
				subtitle="Ethereum"
				rightValue="1023.08"
				rightBottomValueUSd={634.9375}
				perc={12.40}
			/>

			<TokenItemCard
				token="btc"
				name="USD Coin"
				symbol="USDC"
				subtitle="Ethereum"
				perc={-8.23}
				mb="xs"
			/>

		</Paper>
	);
};
