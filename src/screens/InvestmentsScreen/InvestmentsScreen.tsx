import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { Text, View, TokenItemCard, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useBalances, useLanguage, useNavigation } from '@hooks';
import { TokenType } from '@styles';
import { InvestmentToken } from '@models/types/token.types';
import { fetchTokensPriceChange } from '@models/token';
// import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
	RNUxcam.tagScreenName('InvestmentsScreen');
	const { i18n } = useLanguage();
	const { tokens, walletBalance } = useBalances();
	const [investmentTokens, setInvestmentTokens] = useState<InvestmentToken[]>();
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

	const investments = investmentTokens.sort((a, b) => (b.balanceUSD || 0) - (a.balanceUSD || 0));

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

					{/* <Selector {...{ active, setActive }} /> */}

					<View pr="xs">
						{investments.map((item: InvestmentToken) => (
							<TokenItemCard
								key={item.address}
								token={item.symbol.toLowerCase() as TokenType}
								name={item.name!}
								symbol={item.symbol}
								balance={item.balance}
								balanceUSD={item.balanceUSD}
								perc={item.perc}
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
