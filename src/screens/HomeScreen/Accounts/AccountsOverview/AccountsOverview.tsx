import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Paper, View, Text, TokenItemCard } from '@components';
import { useNavigation, useTokens } from '@hooks';
import { MinkeToken } from '@models/types/token.types';
import { TokenType } from '@styles';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

export const AccountsOverview = () => {
	const navigation = useNavigation();
	const { stablecoins = [] } = useTokens();
	const {
		network: { topUpTokens }
	} = useState(globalWalletState()).value;
	const [defaultToken] = topUpTokens;
	let biggestBalanceStable: MinkeToken = {} as MinkeToken;

	stablecoins.forEach((stable) => {
		if ((stable.balanceUSD || 0) > (biggestBalanceStable?.balanceUSD || 0)) {
			biggestBalanceStable = stable;
		}
	});

	const showingStable = biggestBalanceStable || defaultToken;

	return (
		<Paper pt="xs" ph="xs" mb="xs">
			<Text type="lLarge" weight="semiBold" mb="xs">
				Accounts overview
			</Text>
			{!!showingStable.symbol && (
				<>
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
						token={showingStable.symbol.toLowerCase() as TokenType}
						name={showingStable.name}
						symbol={showingStable.symbol}
						subtitle="All networks"
						balanceUSD={showingStable.balanceUSD}
					/>
				</>
			)}

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
				balance="1023.08"
				balanceUSD={634.9375}
				perc={12.4}
			/>

			<TokenItemCard token="btc" name="USD Coin" symbol="USDC" subtitle="Ethereum" perc={-8.23} mb="xs" />
		</Paper>
	);
};
