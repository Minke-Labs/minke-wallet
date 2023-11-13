import { useEffect, useState } from 'react';
import { disabledWallet } from '@src/services/apis/minke/minke';
import { Platform } from 'react-native';

const useWalletEnabled = () => {
	const [walletEnabled, setWalletEnabled] = useState<boolean | undefined>();

	const initializeServices = async () => {
		if (!__DEV__ || Platform.OS === 'android') {
			const { enabled } = await disabledWallet({ wallet: '' });
			setWalletEnabled(enabled);
		} else {
			setWalletEnabled(true);
		}
	};

	useEffect(() => {
		initializeServices();
	}, []);

	return {
		walletEnabled
	};
};

export default useWalletEnabled;
