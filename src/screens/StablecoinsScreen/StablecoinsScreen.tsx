import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { Icon, Text, View, TokenItemCard, EmptyStates, ActivityIndicator, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useBalances, useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { stablecoins as coins } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import { Network, networks } from '@models/network';
import { groupBy } from 'lodash';
import { stables } from '@models/depositTokens';

const StablecoinsScreen = () => {
	RNUxcam.tagScreenName('StablecoinsScreen');
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { stablecoins: walletStablecoins, stablecoinsBalance } = useBalances();
	const apy = '10';
	const productionChainIds = Object.values(networks)
		.filter((n) => !n.testnet)
		.map((n: Network) => n.chainId);

	const allNetworkStables = Object.values(stables)
		.map((s) => Object.values(s))
		.flat()
		.filter((s) => coins.includes(s.symbol));
	const stablecoins: MinkeToken[] = allNetworkStables
		.map((stable) => {
			const { address, symbol } = stable;
			const found = walletStablecoins.find((s) => s.address === address);
			if (found) {
				return found;
			}

			return {
				...stable,
				...{
					name: symbol,
					balance: '0',
					balanceUSD: 0
				}
			};
		})
		.filter((s) => productionChainIds.includes(s.chainId));

	const {
		network: { topUpTokens }
	} = useGlobalWalletState();

	const groupedStablecoins = Object.values(groupBy(stablecoins, 'symbol'));

	const priorities = topUpTokens.map(({ symbol }) => symbol);
	groupedStablecoins.sort((first, second) => {
		const firstBalanceUSD = first.reduce((partialSum, token) => partialSum + (token.balanceUSD || 0), 0);
		const secondBalanceUSD = second.reduce((partialSum, token) => partialSum + (token.balanceUSD || 0), 0);
		return (
			secondBalanceUSD - firstBalanceUSD ||
			priorities.indexOf(second[0].symbol.toUpperCase()) - priorities.indexOf(first[0].symbol.toUpperCase())
		);
	});

	if (!walletStablecoins) {
		return <BlankStates.Type2 title={i18n.t('StablecoinsScreen.stablecoins')} />;
	}

	return (
		<AssetsLayout
			headerValue={stablecoinsBalance}
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					{i18n.t('StablecoinsScreen.current_value')}
				</Text>
			}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Text type="tSmall" weight="bold" mb="xs">
						{i18n.t('StablecoinsScreen.stablecoins')}
					</Text>

					{!!apy && apy !== '0.00' && (
						<TouchableOpacity onPress={() => navigation.navigate('SaveScreen')}>
							<View row>
								{apy ? (
									<>
										<Text type="lMedium" weight="semiBold" color="cta1" mb="xs">
											{i18n.t('StablecoinsScreen.get_annualized_interest', { apy })}
										</Text>
										<Icon name="chevronRight" size={20} color="cta1" />
									</>
								) : (
									<ActivityIndicator size={16} />
								)}
							</View>
						</TouchableOpacity>
					)}

					<View pr="xs">
						{stablecoins === undefined ? (
							<ActivityIndicator />
						) : stablecoins.length > 0 ? (
							groupedStablecoins.map((groupItems: MinkeToken[]) => {
								const [coin] = groupItems;
								const token = {
									...coin,
									...{
										balanceUSD: groupItems.reduce(
											(partialSum, t) => partialSum + (t.balanceUSD || 0),
											0
										),
										balance: groupItems
											.reduce((partialSum, t) => partialSum + (Number(t.balance) || 0), 0)
											.toString()
									}
								};

								return (
									<TokenItemCard
										key={coin.symbol}
										token={token}
										onPress={() => navigation.navigate('StablecoinsDetailScreen', { coin: token })}
										chainIds={groupItems.map((i) => i.chainId)}
										showNetworkIcon={false}
										paper
									/>
								);
							})
						) : (
							<EmptyStates.NoTokens />
						)}
					</View>
				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default StablecoinsScreen;
