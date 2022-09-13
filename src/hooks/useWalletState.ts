import React, { useEffect } from 'react';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import { globalWalletState } from '@stores/WalletStore';
import { useState } from '@hookstate/core';

const useWalletState = () => {
	const state = useState(globalWalletState());
	const [ensName, setEnsName] = React.useState<string | null>('');
	const { address } = state.value;

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};

		fetchENSAddress();
	}, [address]);

	const accountName = () => {
		if (ensName) return ensName;
		return smallWalletAddress(address);
	};

	return {
		state,
		ensName,
		accountName: accountName()
	};
};

export default useWalletState;
