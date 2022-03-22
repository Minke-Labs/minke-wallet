import { AllMinkeWallets, getAllWallets, MinkeWallet } from '@models/wallet';
import { useState, useEffect } from 'react';

interface UseWallets {
	wallets: AllMinkeWallets | null;
	walletById: (id: string) => MinkeWallet | null;
}

const useWallets = (): UseWallets => {
	const [wallets, setWallets] = useState<AllMinkeWallets | null>({});

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, []);

	const walletById = (id: string): MinkeWallet | null => {
		const all = wallets || {};
		return all[id];
	};

	return { wallets, walletById };
};

export default useWallets;
