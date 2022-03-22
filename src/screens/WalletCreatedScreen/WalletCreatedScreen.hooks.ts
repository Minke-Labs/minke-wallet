import { useState } from '@hookstate/core';
import { getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { backupSeedOnKeychain } from '@models/keychain';
import { useNavigation } from '@hooks';

export const useWalletCreatedScreen = () => {
	const navigation = useNavigation();

	const backupManually = () => navigation.navigate('BackupScreen');
	const onFinish = () => navigation.navigate('WalletScreen');

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);

	const backupOnKeychain = async () => {
		const toBackup = seed.value || walletState.privateKey.value;
		if (toBackup) {
			const backedUp = await backupSeedOnKeychain(toBackup);
			if (backedUp) {
				onFinish();
			} else {
				backupManually();
			}
		}
	};

	return {
		backupManually,
		seed,
		backupOnKeychain
	};
};
