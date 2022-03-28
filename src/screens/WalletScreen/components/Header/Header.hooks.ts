import React, { useEffect } from 'react';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { useState } from '@hookstate/core';

export const useHeader = () => {
	const [ensName, setEnsName] = React.useState<string | null>('');
	const state = useState(globalWalletState());
	const { address } = state.value;

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};

		fetchENSAddress();
	}, []);

	const accountName = () => {
		if (ensName) {
			return ensName;
		}
		return smallWalletAddress(address);
	};

	return {
		accountName,
		state
	};
};
