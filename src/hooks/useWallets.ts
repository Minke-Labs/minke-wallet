import { useState, useEffect, useCallback } from 'react';
import { AllMinkeWallets, getAllWallets, MinkeWallet } from '@models/wallet';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

interface UseWallets {
	wallets: AllMinkeWallets;
	walletById: (id: string) => MinkeWallet | null;
	address: string;
}

const useWallets = (): UseWallets => {
	const [wallets, setWallets] = useState<AllMinkeWallets>({});
	const { address } = useGlobalWalletState();

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets((await getAllWallets()) || {});
		};
		fetchWallets();
	}, [address]);

	const walletById = useCallback(
		(id: string): MinkeWallet | null => {
			const all = wallets || {};
			return all[id];
		},
		[wallets]
	);

	return { wallets, walletById, address };
};

export default useWallets;
