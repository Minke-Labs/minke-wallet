import { useState } from '@hookstate/core';
import { getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { useNavigation } from '@hooks';

export const useWalletCreatedScreen = () => {
	const navigation = useNavigation();
	const { walletId } = useState(globalWalletState()).value;
	const backupManually = () => navigation.navigate('ManualBackupScreen', { walletId: walletId || '' });

	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);

	return {
		backupManually,
		seed,
		walletId
	};
};
