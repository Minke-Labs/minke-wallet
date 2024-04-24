import React, { useEffect, useState } from 'react';
import { Paper, View, Text, TokenItemCard, Touchable, BlankStates } from '@components';
import { useBalances, useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { InvestmentToken, MinkeToken } from '@models/types/token.types';
import { fetchTokensPriceChange } from '@models/token';
import { groupBy } from 'lodash';
import { log } from 'react-native-reanimated';
import { debug } from 'util';

export const AccountsOverview: React.FC = () => {
	const { i18n } = useLanguage();
	const {
		network: { topUpTokens }
	} = useGlobalWalletState();
	const navigation = useNavigation();
	const { stablecoins = [], tokens = [] } = useBalances();
	const [investmentHighlights, setInvestmentHighlights] = useState<InvestmentToken[]>(tokens);
	const [defaultToken] = topUpTokens;
	let biggestBalanceStable = {} as MinkeToken;
	let biggestBalanceGroup: MinkeToken[] = [];

	const groupedStablecoins = Object.values(groupBy(stablecoins, 'symbol'));

	groupedStablecoins.forEach((stableGroup) => {
		const [stable] = stableGroup;
		const groupBalanceUSD = stableGroup.reduce((partialSum, token) => partialSum + (token.balanceUSD || 0), 0);
		const groupBalance = stableGroup
			.reduce((partialSum, token) => partialSum + (Number(token.balance) || 0), 0)
			.toString();
		if (groupBalanceUSD > (biggestBalanceStable?.balanceUSD || 0)) {
			biggestBalanceStable = { ...stable, ...{ balanceUSD: groupBalanceUSD, balance: groupBalance } };
			biggestBalanceGroup = stableGroup;
		}
	});

	const showingStable = biggestBalanceStable?.symbol ? biggestBalanceStable : defaultToken;

	useEffect(() => {
		const fetchPriceChanges = async () => {
			debug(`Tokens are${tokens}`);
			if (tokens.length > 0) {
				debug(`Tokens are${tokens}`);
				const investedTokens = await fetchTokensPriceChange(tokens);
				const sorted = investedTokens.sort((a: any, b: any) => (b.perc || 0) - (a.perc || 0));

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

	// if (investmentHighlights.length === 0 && !showingStable.symbol) {
	// 	return (
	// 		<View mb="xs">
	// 			<BlankStates.Type5 />
	// 		</View>
	// 	);
	// }

	return (
		<Paper pt="xs" ph="xs" mb="xs">
			<Text type="lLarge" weight="semiBold" mb="xs">
				{i18n.t('HomeScreen.Accounts.AccountsOverview.overview')}
			</Text>
			{!!showingStable.symbol && (
				<>
					<View row cross="center" mb="xs">
						<Text type="lSmall" weight="semiBold" color="text2">
							{i18n.t('HomeScreen.Accounts.AccountsOverview.stablecoins')}
						</Text>
						<View mr="xxs" />
						<Touchable onPress={() => navigation.navigate('StablecoinsScreen')}>
							<Text type="bSmall" color="cta1">
								{i18n.t('HomeScreen.Accounts.AccountsOverview.see_all')}
							</Text>
						</Touchable>
					</View>

					<TokenItemCard
						token={showingStable}
						onPress={() => navigation.navigate('StablecoinsDetailScreen', { coin: showingStable })}
						showNetworkIcon={false}
						chainIds={biggestBalanceGroup.map((group) => group.chainId)}
					/>
				</>
			)}

			{investmentHighlights.length > 0 && (
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
			)}

			{investmentHighlights.map((token) => (
				<TokenItemCard
					key={`${token.address}-${token.chainId}`}
					token={token}
					onPress={() => navigation.navigate('InvestmentsDetailScreen', { coin: token })}
					showNetworkIcon={false}
					chainIds={[token.chainId]}
				/>
			))}
		</Paper>
	);
};
