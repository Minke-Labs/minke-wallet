/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks';
import { getTokenMarketCap, getTokenData, getTokenVolume } from '@models/token';
import { MinkeToken } from '@models/types/token.types';

export const useAssetDetailScreen = (coin: MinkeToken) => {
	const { i18n } = useLanguage();
	const [tokenData, setTokenData] = useState<any>(null);
	const [tokenVolume, setTokenVolume] = useState<any>(null);
	const [marketCap, setMarketCap] = useState<any>(null);

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
			const res = await getTokenVolume(coin.name!);
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
			const mktCapArr = res.map((item: any) => ({ id: item.id, market_cap: item.market_cap }));
			const mktCap = mktCapArr.find((item: any) => item.id === coin.id!.toLowerCase());
			if (mktCap?.market_cap.errors) setMarketCap(null);
			else setMarketCap(mktCap?.market_cap);
		} else setMarketCap(null);
	};

	useEffect(() => {
		fetchMarketCap();
		fetchTokenData();
		fetchTokenVolume();
	}, []);

	return {
		description: tokenData?.description[i18n.currentLocale()] || tokenData?.description.en,
		tokenVolume,
		marketCap
	};
};