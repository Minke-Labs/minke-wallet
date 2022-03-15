/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTokenMarketCap, getTokenData, getTokenVolume } from '@models/token';
import Balance from './Balance/Balance';
import MarketCap from './MarketCap/MarketCap';
import styles from './AssetsScreen.styles';
import { Upper } from './Upper/Upper';
import AboutCoin from './AboutCoin/AboutCoin';

type Props = NativeStackScreenProps<RootStackParamList, 'AssetsScreen'>;

const AssetsScreen = ({ route }: Props) => {
	const [tokenData, setTokenData] = useState<any>(null);
	const [tokenVolume, setTokenVolume] = useState<any>(null);
	const [marketCap, setMarketCap] = useState<any>(null);
	const { colors } = useTheme();
	const { coin } = route.params;

	const fetchTokenData = async () => {
		const res = await getTokenData(coin.id);
		if (res.errors) {
			const res = await getTokenData(coin.name);
			if (res.errors) {
				const res = await getTokenData(coin.symbol);
				if (res.errors) setTokenData(null);
				else setTokenData(res);
			} else {
				setTokenData(res);
			}
		} else {
			setTokenData(res);
		}
	};

	const fetchTokenVolume = async () => {
		const res = await getTokenVolume(coin.id!);
		if (res.errors) {
			const res = await getTokenVolume(coin.name);
			if (res.errors) {
				const res = await getTokenVolume(coin.symbol);
				if (res.errors) setTokenVolume(null);
				else setTokenVolume(res);
			} else {
				setTokenVolume(res);
			}
		} else {
			setTokenVolume(res);
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
		fetchMarketCap();
		fetchTokenData();
		fetchTokenVolume();
	}, []);

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.detail4 }]}>
			<SafeAreaView>
				<Upper {...{ coin }} />
				<ScrollView style={[styles.bodyContainer, { backgroundColor: colors.background1 }]}>
					<Balance {...{ coin }} />
					{marketCap > 0 && tokenVolume && (
						<MarketCap tokenVolume={tokenVolume.total_volumes} marketCap={marketCap} />
					)}
					{tokenData && <AboutCoin data={tokenData} name={coin.name} />}
				</ScrollView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default AssetsScreen;
