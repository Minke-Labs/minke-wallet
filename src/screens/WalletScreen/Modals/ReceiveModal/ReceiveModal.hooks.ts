import React, { useEffect } from 'react';
import { Share } from 'react-native';
import { useState } from '@hookstate/core';
import { getENSAddress } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';

export const useReceiveModal = () => {
	const wallet = useState(globalWalletState());
	const [ensName, setEnsName] = React.useState<string | null>();

	const address = wallet.value.address || '';
	const onShare = async () => {
		await Share.share({ message: address });
	};

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};
		fetchENSAddress();
	}, []);

	return {
		address,
		ensName,
		onShare
	};
};
