import { groupBy } from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';

import { Balance, Expander, View } from '@components';
import { useBalances, useNavigation } from '@hooks';
import { BasicLayout } from '@layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';

import ByNetworks from './ByNetworks/ByNetworks';
import { Header } from './Header/Header';
import { useStablecoinsDetailScreen } from './useStablecoinsDetailScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'StablecoinsDetailScreen'>;

const StablecoinsDetailScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('StablecoinsDetailScreen');
	const navigation = useNavigation();
	const { coin } = route.params;
	const { stablecoins } = useBalances();
	const { description } = useStablecoinsDetailScreen(coin);

	const tokens = groupBy(stablecoins, 'symbol')[coin.symbol] || [];
	const stablecoin = {
		...coin,
		...{
			balanceUSD: tokens.reduce((partialSum, token) => partialSum + (token.balanceUSD || 0), 0),
			balance: tokens.reduce((partialSum, token) => partialSum + (Number(token.balance) || 0), 0).toString()
		}
	};

	return (
		<>
			<BasicLayout>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph="xs">
						<Header title={coin.name || ''} symbol={coin.symbol} onPress={() => navigation.goBack()} />
						<Balance coin={stablecoin} stablecoin buySellToken={tokens[0]} />
						<ByNetworks tokens={tokens} fallback={coin} />
						{!!description && <Expander title={coin.name || ''} desc={description} />}
					</View>
				</ScrollView>
			</BasicLayout>
		</>
	);
};

export default StablecoinsDetailScreen;
