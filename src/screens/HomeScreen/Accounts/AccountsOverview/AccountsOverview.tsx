import React, { useEffect, useState } from 'react';
import { Paper, View, Text, TokenItemCard, Touchable, BlankStates } from '@components';
import { useBalances, useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { InvestmentToken, MinkeToken } from '@models/types/token.types';
import { TokenType } from '@styles';
import { fetchTokensPriceChange, truncBalances } from '@models/token';

export const AccountsOverview: React.FC = () => {
	const { i18n } = useLanguage();
	const [investmentHighlights, setInvestmentHighlights] = useState<InvestmentToken[]>([]);
	const {
		network: { topUpTokens }
	} = useGlobalWalletState();
	const navigation = useNavigation();
	const { stablecoins = [], tokens = [] } = useBalances();
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
				const sorted = investedTokens.sort((a: any, b: any) => (b.perc || 0) - (a.perc || 0));

				const truncated = truncBalances(sorted);

				const highlights = [];
				highlights.push(truncated[0]);

				if (tokens.length > 1) {
					highlights.push(truncated[truncated.length - 1]);
				}

				setInvestmentHighlights(highlights);
			}
		};

		fetchPriceChanges();
	}, [tokens]);

	if (!(investmentHighlights.length > 0)) {
		return (
			<View mb="xs">
				<BlankStates.Type5 />
			</View>
		);
	}

	return (
		<Paper pt="xs" ph="xs" mb="xs">
			<Text type="lLarge" weight="semiBold" mb="xs">
				{i18n.t('HomeScreen.Accounts.AccountsOverview.overview')}
			</Text>
			{!!showingStable.symbol && (
				<>
					<View row cross="center" mb="xs">
						<Text type="lSmall" weight="semiBold" color="text2">
							Stablecoins
						</Text>
						<View mr="xxs" />
						<Touchable onPress={() => navigation.navigate('StablecoinsScreen')}>
							<Text type="bSmall" color="cta1">
								{i18n.t('HomeScreen.Accounts.AccountsOverview.see_all')}
							</Text>
						</Touchable>
					</View>

					<TokenItemCard
						token={showingStable.symbol.toLowerCase() as TokenType}
						name={showingStable.name}
						symbol={showingStable.symbol}
						balance={showingStable.balance}
						balanceUSD={showingStable.balanceUSD}
						onPress={() => navigation.navigate('StablecoinsDetailScreen', { coin: showingStable })}
						stablecoin
					/>
				</>
			)}

			<View row cross="center" mb="xs">
				<Text type="lSmall" weight="semiBold" color="text2">
					{i18n.t('HomeScreen.Accounts.AccountsOverview.investments_highlight')}
				</Text>
				<View mr="xxs" />
				<Touchable onPress={() => navigation.navigate('InvestmentsScreen')}>
					<Text type="bSmall" color="cta1">
						{i18n.t('HomeScreen.Accounts.AccountsOverview.see_all')}
					</Text>
				</Touchable>
			</View>

			{investmentHighlights.map((token) => (
				<TokenItemCard
					key={token.address}
					token={token.symbol.toLowerCase() as TokenType}
					name={token.name}
					symbol={token.symbol}
					balance={token.balance}
					balanceUSD={token.balanceUSD}
					perc={token.perc}
					onPress={() => navigation.navigate('InvestmentsDetailScreen', { coin: token })}
				/>
			))}
		</Paper>
	);
};
