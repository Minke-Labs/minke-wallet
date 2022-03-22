import { useState } from '@hookstate/core';
import { getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { backupSeedOnKeychain } from '@models/keychain';
import { useNavigation } from '@hooks';

export const useWalletCreatedScreen = () => {
	const navigation = useNavigation();
	const backupManually = () => navigation.navigate('BackupScreen');

	const { walletId } = useState(globalWalletState()).value;
	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);

	return {
		backupManually,
		seed,
		walletId
	};
};
