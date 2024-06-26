import React, { createContext, useEffect, useMemo, useState } from 'react';

import { numberFormat } from '@helpers/utilities';
import { NFT } from '@models/types/nft.types';
import { fetchNFTNetWorth, getAssets } from '@src/services/apis';

import useGlobalWalletState from '../../hooks/useGlobalWalletState';

interface NFTContextProps {
	assets: NFT[];
	nftsByCollection: { [key: string]: NFT[] };
	estimatedValue: string;
	networth: number;
	loading: boolean;
}

export const NFTContext = createContext<NFTContextProps>({} as NFTContextProps);

const NFTProvider: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const { address } = useGlobalWalletState();
	const [assets, setAssets] = useState<NFT[]>([]);
	const [networth, setNetworth] = useState(0);
	const [estimatedValue, setEstimatedValue] = useState('0');

	useEffect(() => {
		const fetchAssets = async () => {
			const res = await getAssets(address);
			setAssets(res);
		};
		const fetchEstimatedValue = async () => {
			const netWorth = await fetchNFTNetWorth(address);
			const value = +netWorth || 0;
			setNetworth(value);
			setEstimatedValue(numberFormat(value, 2));
		};
		fetchAssets();
		fetchEstimatedValue();
		setLoading(false);
	}, [address]);

	const nftsByCollection = assets?.reduce((acc: any, curr: any) => {
		acc[curr.collection.slug] = [...(acc[curr.collection.slug] || []), curr];
		return acc;
	}, {});

	const obj = useMemo(
		() => ({
			assets,
			nftsByCollection,
			estimatedValue,
			networth,
			loading,
			setLoading
		}),
		[assets, estimatedValue, address, networth, loading]
	);

	return <NFTContext.Provider value={obj}>{children}</NFTContext.Provider>;
};

export default NFTProvider;
