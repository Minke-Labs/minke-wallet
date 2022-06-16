import React, { useEffect } from 'react';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import crypto from 'crypto';
import { INTERCOM_KEY } from '@env';
import Intercom from '@intercom/intercom-react-native';

const useAccountName = (address: string) => {
	const [ensName, setEnsName] = React.useState<string | null>('');

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

	// Register user on Intercom
	const intercomKey = INTERCOM_KEY || process.env.INTERCOM_KEY;
	const hmac = crypto.createHmac('sha256', intercomKey!);
	hmac.update(accountName());
	const sign = hmac.digest('hex');
	Intercom.setUserHash(sign);
	Intercom.registerIdentifiedUser({ userId: accountName() });
	//
	return accountName();
};

export default useAccountName;
