/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks';
import { getTokenMarketCap, getTokenData, getTokenVolume, MinkeToken } from '@models/token';

export const useAssetsScreen = (coin: MinkeToken) => {
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

	return {
		description: tokenData?.description[i18n.currentLocale()] || tokenData?.description.en,
		tokenVolume,
		marketCap
	};
};
