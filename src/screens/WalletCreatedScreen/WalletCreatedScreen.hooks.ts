import { useState } from '@hookstate/core';
import { getSeedPhrase } from '@models/wallet';
import { useNavigation, useAuthentication, useGlobalWalletState } from '@hooks';

export const useWalletCreatedScreen = () => {
	const navigation = useNavigation();
	const { walletId } = useGlobalWalletState();
	const { showAuthenticationPrompt } = useAuthentication();

	const backupManually = () =>
		showAuthenticationPrompt({
			onSuccess: () => navigation.navigate('ManualBackupScreen', { walletId: walletId || '' })
		});

	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);

	return {
		backupManually,
		seed,
		walletId
	};
};
