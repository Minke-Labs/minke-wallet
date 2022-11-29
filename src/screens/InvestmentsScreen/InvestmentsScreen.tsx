import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { Text, View, TokenItemCard, BlankStates, SearchInput, Icon, Touchable, Token } from '@components';
import { AssetsLayout } from '@layouts';
import { useBalances, useLanguage, useNavigation } from '@hooks';
import { InvestmentToken } from '@models/types/token.types';
import { fetchTokensPriceChange } from '@models/token';
import { Network, networks } from '@models/network';
import { groupBy } from 'lodash';
// import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
	RNUxcam.tagScreenName('InvestmentsScreen');
	const { i18n } = useLanguage();
	const { tokens, walletBalance } = useBalances();
	const [investmentTokens, setInvestmentTokens] = useState<InvestmentToken[]>(tokens.reverse());
	const [search, setSearch] = useState('');
	const [enabledSearch, setEnabledSearch] = useState(false);
	const [chainIdSearch, setChainIdSearch] = useState<number>();
	const navigation = useNavigation();
	const ref = useRef<TextInput>(null);

	useEffect(() => {
		const fetchPriceChanges = async () => {
			if (tokens) {
				setInvestmentTokens(await fetchTokensPriceChange(tokens));
			}
		};
		fetchPriceChanges();
	}, [tokens]);

	const toggleSearch = () => {
		const enabled = !enabledSearch;
		setEnabledSearch(enabled);
		setChainIdSearch(undefined);
		if (enabled) {
			ref.current?.focus();
		} else {
			setSearch('');
		}
	};

	if (investmentTokens === undefined) {
		return <BlankStates.Type2 title={i18n.t('InvestmentsScreen.investments')} />;
	}

	let investments = investmentTokens;

	if (search) {
		const query = search.toLowerCase();
		investments = investments.filter(
			(t) =>
				t.symbol.toLowerCase().includes(query) ||
				t.name?.toLowerCase().includes(query) ||
				t.address.toLowerCase().includes(query)
		);
	}

	if (chainIdSearch) {
		investments = investments.filter((t) => t.chainId === chainIdSearch);
	}

	const groupedInvestments = Object.values(groupBy(investments, 'symbol'));

	groupedInvestments.sort((first, second) => {
		const firstBalanceUSD = first.reduce((partialSum, token) => partialSum + (token.balanceUSD || 0), 0);
		const secondBalanceUSD: number = second.reduce((partialSum, token) => partialSum + (token.balanceUSD || 0), 0);
		const firstPercentage = first[0].perc || -100;
		const secondPercentage = second[0].perc || -100;
		const firstBalance = Number(first[0].balance || '0');
		const secondBalance = Number(second[0].balance || '0');
		return secondBalanceUSD - firstBalanceUSD || secondBalance - firstBalance || secondPercentage - firstPercentage;
	});

	return (
		<AssetsLayout
			headerValue={walletBalance}
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					{i18n.t('InvestmentsScreen.current_value')}
				</Text>
			}
			showValue={!enabledSearch}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Touchable
						row
						main="space-between"
						pr="xs"
						mt={enabledSearch ? 'xs' : undefined}
						onPress={toggleSearch}
					>
						<Text type="tMedium" weight="bold" mb="s">
							{i18n.t('InvestmentsScreen.investments')}
						</Text>
						<Icon name={enabledSearch ? 'close' : 'searchStroke'} color="cta1" size={20} />
					</Touchable>

					<View pr="xs" style={{ display: enabledSearch ? 'flex' : 'none' }}>
						<SearchInput
							marginBottom={24}
							placeholder={i18n.t('Components.Inputs.search')}
							search={search}
							onSearch={(val) => setSearch(val)}
							textInputRef={ref}
						/>
					</View>

					{!enabledSearch && (
						<View row main="space-between" pr="xs" mb="m">
							{Object.values(networks)
								.filter((n: Network) => !n.testnet)
								.map(({ name, shortName, nativeToken, chainId }) => (
									<Touchable
										row
										main="center"
										p="xxs"
										onPress={() => setChainIdSearch(chainId)}
										key={chainId}
										bgc={chainIdSearch === chainId ? 'background5' : undefined}
										bw={1}
										bc={chainIdSearch === chainId ? 'background5' : 'text6'}
										br="s"
									>
										<View mr="xxs">
											<Token token={nativeToken} size={20} />
										</View>
										<Text
											type="lMedium"
											weight="semiBold"
											color={chainIdSearch === chainId ? 'text1' : 'text3'}
										>
											{shortName || name}
										</Text>
									</Touchable>
								))}
						</View>
					)}

					{/* <Selector {...{ active, setActive }} /> */}

					<View pr="xs">
						{groupedInvestments.map((groupItems: InvestmentToken[]) => {
							const [item] = groupItems;
							const coin = {
								...item,
								...{
									balanceUSD: groupItems.reduce(
										(partialSum, token) => partialSum + (token.balanceUSD || 0),
										0
									),
									balance: groupItems
										.reduce((partialSum, token) => partialSum + (Number(token.balance) || 0), 0)
										.toString()
								}
							};

							return (
								<TokenItemCard
									key={`${item.address}-${item.chainId}`}
									token={coin}
									onPress={() => navigation.navigate('InvestmentsDetailScreen', { coin })}
									showNetworkIcon={false}
									chainIds={groupItems.map((i) => i.chainId)}
								/>
							);
						})}
					</View>
				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default InvestmentsScreen;
