import { useEffect, useState } from 'react';
import { disabledWallet } from '@src/services/apis/minke/minke';

const useWalletEnabled = () => {
	const [walletEnabled, setWalletEnabled] = useState<boolean | undefined>();

	const initializeServices = async () => {
		if (!__DEV__) {
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
