import { useState, useEffect, useCallback } from 'react';
import { AllMinkeWallets, getAllWallets, getPrivateKey, MinkeWallet } from '@models/wallet';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

interface UseWallets {
	wallets: AllMinkeWallets;
	walletById: (id: string) => MinkeWallet | null;
	address: string;
	walletsWithPk: MinkeWallet[];
}

const useWallets = (): UseWallets => {
	const [wallets, setWallets] = useState<AllMinkeWallets>({});
	const [walletsWithPk, setWalletsWithPk] = useState<MinkeWallet[]>([]);
	const { address } = useGlobalWalletState();

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets((await getAllWallets()) || {});
		};
		fetchWallets();
	}, [address]);

	useEffect(() => {
		const fetchWalletsWithPk = async () => {
			const walletsObj = Object.values(wallets);
			if (walletsObj) {
				const promises = walletsObj.filter(async (w) => {
					const pk = await getPrivateKey(w.address);
					return !!pk;
				});

				setWalletsWithPk(await Promise.all(promises));
			}
		};
		fetchWalletsWithPk();
	}, [wallets]);

	const walletById = useCallback(
		(id: string): MinkeWallet | null => {
			const all = wallets || {};
			return all[id];
		},
		[wallets]
	);

	return { wallets, walletById, address, walletsWithPk };
};

export default useWallets;
