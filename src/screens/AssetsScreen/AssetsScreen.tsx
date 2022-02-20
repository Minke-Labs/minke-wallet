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
	const [all, setAll] = useState<any>();
	const [hour, setHour] = useState<any>();
	const [day, setDay] = useState<any>();
	const [week, setWeek] = useState<any>();
	const [month, setMonth] = useState<any>();
	const [year, setYear] = useState<any>();
	const { colors } = useTheme();
	const { coin } = route.params;

	const fetchData = async () => {
		const resAll = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol }));
		setAll(resAll);
		const restHour = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol, type: 'hour' }));
		setHour(restHour);
		const resDay = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol, type: 'day' }));
		setDay(resDay);
		const resWeek = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol, type: 'week' }));
		setWeek(resWeek);
		const resMonth = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol, type: 'month' }));
		setMonth(resMonth);
		const resYear = await getTokenHistory(coinParamFromSymbol({ symbol: coin.symbol, type: 'year' }));
		setYear(resYear);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.detail4 }}>
			<SafeAreaView>
				<Header {...{ coin }} />
				{all && hour && day && week && month && year && <Chart {...{ all, hour, day, week, month, year }} />}
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
					<Balance />
					<MarketCap />
				</ScrollView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default AssetsScreen;
