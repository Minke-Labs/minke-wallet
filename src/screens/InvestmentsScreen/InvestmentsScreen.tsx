import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, TokenItemCard, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useNavigation, useTokens, useLanguage } from '@hooks';
import { TokenType } from '@styles';
import { InvestmentToken } from '@models/types/token.types';
import { fetchTokensPriceChange } from '@models/token';
// import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
	const { i18n } = useLanguage();
	const { tokens, walletBalance: balance } = useTokens();
	const [investmentTokens, setInvestmentTokens] = useState<InvestmentToken[]>();

	// const [active, setActive] = useState(0);
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
		return (
			<BlankStates.Type2 title={i18n.t('Components.BlankStates.WalletAssets')} />
		);
	}

	return (
		<AssetsLayout
			headerValue={balance}
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					Current value
				</Text>
			}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Text type="tSmall" weight="bold" mb="s">
						Investments
					</Text>

					{/* <Selector {...{ active, setActive }} /> */}

					<View pr="xs" mt="xs">
						{investmentTokens.map((item: InvestmentToken) => (
							<TokenItemCard
								key={item.address}
								token={item.symbol.toLowerCase() as TokenType}
								name={item.name!}
								symbol={item.symbol}
								subtitle="All networks"
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
