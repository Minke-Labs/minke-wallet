import React, { createContext, useEffect, useMemo, useState } from 'react';
import { getCustomDomain, smallWalletAddress } from '@models/wallet';
import useGlobalWalletState from '../../hooks/useGlobalWalletState';

interface WalletContextProps {
	customDomain: string | null;
	accountName: string;
}

export const WalletContext = createContext<WalletContextProps>({} as WalletContextProps);

const WalletProvider: React.FC = ({ children }) => {
	const {
		address,
		network: { chainId }
	} = useGlobalWalletState();
	const [customDomain, setCustomDomain] = useState<string | null>('');

	useEffect(() => {
		const fetchCustomDomain = async () => {
			const name = await getCustomDomain(address);
			setCustomDomain(name);
		};

		fetchCustomDomain();
	}, [address, chainId]);

	const accountName = customDomain || smallWalletAddress(address);

	const obj = useMemo(
		() => ({
			customDomain,
			accountName
		}),
		[customDomain, accountName]
	);

	return <WalletContext.Provider value={obj}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
