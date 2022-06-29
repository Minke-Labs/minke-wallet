import React, { useEffect } from 'react';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import { globalWalletState } from '@stores/WalletStore';
import { useState } from '@hookstate/core';
import crypto from 'crypto';
import { INTERCOM_KEY } from '@env';
import Intercom from '@intercom/intercom-react-native';

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
	}, []);

	const accountName = () => {
		if (ensName) {
			return ensName;
		}
		return smallWalletAddress(address);
	};

	useEffect(() => {
		const intercomKey = INTERCOM_KEY || process.env.INTERCOM_KEY;
		const hmac = crypto.createHmac('sha256', intercomKey!);
		hmac.update(accountName());
		const sign = hmac.digest('hex');
		Intercom.setUserHash(sign);
		Intercom.registerIdentifiedUser({ userId: accountName() });
	}, [address]);

	return {
		state,
		ensName,
		accountName: accountName()
	};
};

export default useWalletState;
