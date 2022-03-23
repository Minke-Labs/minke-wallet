import { useState, useEffect, useCallback } from 'react';
import { AllMinkeWallets, getAllWallets, MinkeWallet } from '@models/wallet';

interface UseWallets {
	wallets: AllMinkeWallets;
	walletById: (id: string) => MinkeWallet | null;
}

const useWallets = (): UseWallets => {
	const [wallets, setWallets] = useState<AllMinkeWallets>({});

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets((await getAllWallets()) || {});
		};
		fetchWallets();
	}, [setWallets]);

	const walletById = useCallback(
		(id: string): MinkeWallet | null => {
			const all = wallets || {};
			return all[id];
		},
		[wallets]
	);

	return { wallets, walletById };
};

export default useWallets;
