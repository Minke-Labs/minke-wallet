import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Paper, View, Text, TokenItemCard } from '@components';
import { useNavigation, useTokens } from '@hooks';
import { InvestmentToken, MinkeToken } from '@models/types/token.types';
import { TokenType } from '@styles';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { fetchTokensPriceChange } from '@models/token';

export const AccountsOverview = () => {
	const [investmentHighlights, setInvestmentHighlights] = React.useState<InvestmentToken[]>([]);
	const {
		network: { topUpTokens }
	} = useState(globalWalletState()).value;
	const navigation = useNavigation();
	const { stablecoins = [], tokens = [] } = useTokens();
	const [defaultToken] = topUpTokens;
	let biggestBalanceStable: MinkeToken = {} as MinkeToken;

	stablecoins.forEach((stable) => {
		if ((stable.balanceUSD || 0) > (biggestBalanceStable?.balanceUSD || 0)) {
			biggestBalanceStable = stable;
		}
	});

	const showingStable = biggestBalanceStable || defaultToken;

	useEffect(() => {
		const fetchPriceChanges = async () => {
			if (tokens.length > 0) {
				const investedTokens = await fetchTokensPriceChange(tokens);
				const sorted = investedTokens.sort((a, b) => (b.perc || 0) - (a.perc || 0));

				const highlights = [];
				highlights.push(sorted[0]);

				if (tokens.length > 1) {
					highlights.push(sorted[sorted.length - 1]);
				}

				setInvestmentHighlights(highlights);
			}
		};

		fetchPriceChanges();
	}, [tokens]);

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
						onPress={() => navigation.navigate('AssetDetailScreen', { coin: showingStable })}
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

			{investmentHighlights.map((token) => (
				<TokenItemCard
					key={token.address}
					token={token.symbol.toLowerCase() as TokenType}
					name={token.name}
					symbol={token.symbol}
					subtitle="All networks"
					balance={token.balance}
					balanceUSD={token.balanceUSD}
					perc={token.perc}
					onPress={() => navigation.navigate('AssetsScreen', { coin: token })}
				/>
			))}
		</Paper>
	);
};
