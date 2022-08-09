import React, { createContext, useMemo, useEffect, useState } from 'react';
import { getAssets } from '@models/openSea';

export const NFTContext = createContext<any>(null);

const NFTProvider: React.FC = ({ children }) => {
	const [assets, setAssets] = useState<any>();

	useEffect(() => {
		const fetchAssets = async () => {
			const res = await getAssets();
			setAssets(res);
		};
		fetchAssets();
	}, []);

	const nftsByCollection = assets?.reduce((acc: any, curr: any) => {
		acc[curr.collection.slug] = [...acc[curr.collection.slug] || [], curr];
		return acc;
	}, {});

	const estimatedValue = assets?.reduce((acc: any, curr: any) => {
		if (curr.last_sale) {
			return acc + Number(curr.last_sale.payment_token.usd_price);
		}
		return acc;
	}, 0).toString() || '';

	const obj = useMemo(
		() => ({
			assets,
			nftsByCollection,
			estimatedValue
		}),
		[assets]
	);

	return <NFTContext.Provider value={obj}>{children}</NFTContext.Provider>;
};

export default NFTProvider;
