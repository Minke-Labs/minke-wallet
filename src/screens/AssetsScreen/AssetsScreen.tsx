/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import { coinParamFromSymbol } from '@helpers/utilities';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTokenHistory } from '@models/token';
import Chart from './Chart/Chart';
import Balance from './Balance/Balance';
import MarketCap from './MarketCap';
import Header from './Header';

type Props = NativeStackScreenProps<RootStackParamList, 'Assets'>;

const AssetsScreen = ({ route }: Props) => {
	const [data, setData] = useState<any>(null);
	const { colors } = useTheme();
	const { coin } = route.params;

	const fetchData = async () => {
		const res = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol }));
		if (res.errors) {
			const res = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol, type: 'name' }));
			if (res.errors) {
				const res = await getTokenHistory(coin.symbol);
				if (res.errors) {
					setData(null);
				} else {
					setData(res);
				}
			} else {
				setData(res);
			}
		} else {
			setData(res);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.detail4 }}>
			<SafeAreaView>
				<Header {...{ coin }} />
				{data && <Chart {...{ data }} />}
				<ScrollView
					style={{
						width: '100%',
						height: '100%',
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24,
						paddingHorizontal: 24,
						paddingTop: 32,
						backgroundColor: colors.background1
					}}
				>
					<Balance {...{ coin }} />
					<MarketCap />
				</ScrollView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default AssetsScreen;
