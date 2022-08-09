import React, { createContext, useMemo, useEffect, useState } from 'react';
import { NFT } from '@models/types/nft.types';
import { numberFormat } from '@helpers/utilities';
import { fetchNFTNetWorth, getAssets } from '@src/services/apis';
import useWallets from '../../hooks/useWallets';

interface NFTContextProps {
	assets: NFT[];
	nftsByCollection: { [key: string]: NFT[] };
	estimatedValue: string;
}

export const NFTContext = createContext<NFTContextProps>({} as NFTContextProps);

const NFTProvider: React.FC = ({ children }) => {
	const { address } = useWallets();
	const [assets, setAssets] = useState<NFT[]>([]);
	const [estimatedValue, setEstimatedValue] = useState('0');

	useEffect(() => {
		const fetchAssets = async () => {
			const res = await getAssets(address);
			setAssets(res);
		};
		const fetchEstimatedValue = async () => {
			const netWorth = await fetchNFTNetWorth(address);
			setEstimatedValue(numberFormat(+netWorth || 0, 2));
		};
		fetchAssets();
		fetchEstimatedValue();
	}, []);

	const nftsByCollection = assets?.reduce((acc: any, curr: any) => {
		acc[curr.collection.slug] = [...(acc[curr.collection.slug] || []), curr];
		return acc;
	}, {});

	const obj = useMemo(
		() => ({
			assets,
			nftsByCollection,
			estimatedValue
		}),
		[assets, estimatedValue]
	);

	return <NFTContext.Provider value={obj}>{children}</NFTContext.Provider>;
};

export default NFTProvider;
