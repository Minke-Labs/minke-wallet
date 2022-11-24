import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { Text, View, TokenItemCard, BlankStates, SearchInput } from '@components';
import { AssetsLayout } from '@layouts';
import { useBalances, useLanguage, useNavigation } from '@hooks';
import { InvestmentToken } from '@models/types/token.types';
import { fetchTokensPriceChange } from '@models/token';
// import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
	RNUxcam.tagScreenName('InvestmentsScreen');
	const { i18n } = useLanguage();
	const { tokens, walletBalance } = useBalances();
	const [investmentTokens, setInvestmentTokens] = useState<InvestmentToken[]>(tokens.reverse());
	const [search, setSearch] = useState('');
	const navigation = useNavigation();

	useEffect(() => {
		const fetchPriceChanges = async () => {
			if (tokens) {
				setInvestmentTokens(await fetchTokensPriceChange(tokens));
			}
		};
		fetchPriceChanges();
	}, [tokens]);

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
	investments = investments.sort(
		(a, b) => (b.balanceUSD || 0) - (a.balanceUSD || 0) || (Number(b.balance) || 0) - (Number(a.balance) || 0)
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
					<Text type="tSmall" weight="bold" mb="s">
						{i18n.t('InvestmentsScreen.investments')}
					</Text>

					<View pr="xs">
						<SearchInput
							marginBottom={24}
							placeholder={i18n.t('Components.Inputs.search')}
							search={search}
							onSearch={(val) => setSearch(val)}
						/>
					</View>

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
