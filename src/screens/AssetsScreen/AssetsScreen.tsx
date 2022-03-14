/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@hooks';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTokenHistory, getTokenMarketCap } from '@models/token';
import Chart from './Chart/Chart';
import Balance from './Balance/Balance';
import MarketCap from './MarketCap/MarketCap';
import Header from './Header/Header';
import styles from './AssetsScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AssetsScreen'>;

const AssetsScreen = ({ route }: Props) => {
	const [data, setData] = useState<any>(null);
	const [marketCap, setMarketCap] = useState<any>(null);
	const { colors } = useTheme();
	const { coin } = route.params;

	const fetchData = async () => {
		const res = await getTokenHistory(coin.id);
		if (res.errors) {
			const res = await getTokenHistory(coin.name);
			if (res.errors) {
				const res = await getTokenHistory(coin.symbol);
				if (res.errors) setData(null);
				else setData(res);
			} else {
				setData(res);
			}
		} else {
			setData(res);
		}
	};

	const fetchMarketCap = async () => {
		if (coin.id) {
			const res = await getTokenMarketCap(coin.id);
			if (res.errors) setMarketCap(null);
			else setMarketCap(res);
		} else setMarketCap(null);
	};

	useEffect(() => {
		fetchData();
		fetchMarketCap();
	}, []);

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.detail4 }]}>
			<SafeAreaView>
				<Header {...{ coin }} />
				{data ? <Chart {...{ data }} /> : <View style={{ height: 390 }} />}
				<ScrollView style={[styles.bodyContainer, { backgroundColor: colors.background1 }]}>
					<Balance {...{ coin }} />
					{marketCap > 0 && <MarketCap marketCap={marketCap} />}
				</ScrollView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default AssetsScreen;
