import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { Text, View, TokenItemCard, BlankStates, SearchInput, Icon, Touchable, Token } from '@components';
import { AssetsLayout } from '@layouts';
import { useBalances, useLanguage, useNavigation } from '@hooks';
import { InvestmentToken } from '@models/types/token.types';
import { fetchTokensPriceChange } from '@models/token';
import { Network, networks } from '@models/network';
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

	useEffect(() => {
		const fetchPriceChanges = async () => {
			if (tokens) {
				setInvestmentTokens(await fetchTokensPriceChange(tokens));
			}
		};
		fetchPriceChanges();
	}, [tokens]);

	const toggleSearch = () => {
		setEnabledSearch(!enabledSearch);
		setChainIdSearch(undefined);
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

	investments = investments.sort(
		(a, b) => (b.balanceUSD || 0) - (a.balanceUSD || 0) || (b.perc || -100) - (a.perc || -100)
	);

	return (
		<AssetsLayout
			headerValue={walletBalance}
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					{i18n.t('InvestmentsScreen.current_value')}
				</Text>
			}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Touchable row main="space-between" pr="xs" onPress={toggleSearch}>
						<Text type="tMedium" weight="bold" mb="s">
							{i18n.t('InvestmentsScreen.investments')}
						</Text>
						<Icon name="searchStroke" color="cta1" size={20} />
					</Touchable>

					{enabledSearch ? (
						<View pr="xs">
							<SearchInput
								marginBottom={24}
								placeholder={i18n.t('Components.Inputs.search')}
								search={search}
								onSearch={(val) => setSearch(val)}
							/>
						</View>
					) : (
						<View row main="space-between" pr="xs" mb="m">
							{Object.values(networks)
								.filter((n: Network) => !n.testnet)
								.map(({ name, shortName, nativeToken, chainId }) => (
									<Touchable row main="center" p="xxs" onPress={() => setChainIdSearch(chainId)}>
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
						{investments.map((item: InvestmentToken) => (
							<TokenItemCard
								key={item.address}
								token={item}
								onPress={() => navigation.navigate('InvestmentsDetailScreen', { coin: item })}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default InvestmentsScreen;
