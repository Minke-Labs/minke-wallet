import React, { useEffect, useCallback } from 'react';
import { AllMinkeWallets, getAllWallets, MinkeWallet } from '@models/wallet';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

interface UseWallets {
	wallets: AllMinkeWallets;
	walletById: (id: string) => MinkeWallet | null;
	address: string;
}

const useWallets = (): UseWallets => {
	const [wallets, setWallets] = React.useState<AllMinkeWallets>({});
	const { address } = useState(globalWalletState()).value;

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
