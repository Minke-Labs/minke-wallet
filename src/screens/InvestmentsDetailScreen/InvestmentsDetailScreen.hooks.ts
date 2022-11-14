/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useLanguage } from '@hooks';
import { getTokenMarketCap, getTokenData, getTokenVolume } from '@models/token';
import { MinkeToken } from '@models/types/token.types';

export const useInvestmentsDetailScreen = (coin: MinkeToken) => {
	const { language } = useLanguage();
	const [tokenData, setTokenData] = useState<any>(null);
	const [tokenVolume, setTokenVolume] = useState<any>(null);
	const [marketCap, setMarketCap] = useState<any>(null);

	const fetchTokenData = async () => {
		const res = await getTokenData(coin);
		if (res?.error) {
			setTokenData(null);
		} else {
			setTokenData(res);
		}
	};

	const fetchTokenVolume = async () => {
		const res = await getTokenVolume(coin);

		if (res?.error) {
			setTokenVolume(null);
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

	const dataIsPresent = !!(tokenData && tokenData?.description);
	return {
		description: dataIsPresent ? tokenData?.description[language] || tokenData?.description.en : '',
		tokenVolume,
		marketCap
	};
};
