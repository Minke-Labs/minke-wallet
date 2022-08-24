import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View, TokenItemCard, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useNavigation, useTokens } from '@hooks';
import { TokenType } from '@styles';
import { MinkeToken } from '@models/types/token.types';
// import Selector from './Selector/Selector';

const InvestmentsScreen = () => {
	const { tokens, walletBalance: balance } = useTokens();

	// const [active, setActive] = useState(0);
	const navigation = useNavigation();

	if (tokens === undefined || tokens?.length === 0) return <BlankStates.WalletAssets />; // @TODO: Fix skeleton title

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
						{tokens.map((item: MinkeToken) => (
							<TokenItemCard
								key={item.address}
								token={item.symbol.toLowerCase() as TokenType}
								name={item.name!}
								symbol={item.symbol}
								subtitle="All networks"
								balance={item.balance}
								balanceUSD={item.balanceUSD}
								onPress={() => navigation.navigate('AssetsScreen', { coin: item })}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default InvestmentsScreen;
