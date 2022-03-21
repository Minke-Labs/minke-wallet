import { CLOUD_BACKUP_ERRORS, isCloudBackupAvailable } from '@models/cloudBackup';
import { addWalletToCloudBackup, backupWalletToCloud, fetchBackupPassword, findLatestBackUp } from '@models/backup';
import { delay } from '@helpers/utilities';
import { values } from 'lodash';
import { getAllWallets, setWalletBackedUp } from '@models/wallet';

const walletLoadingStates = {
	BACKING_UP_WALLET: 'Backing up...',
	CREATING_WALLET: 'Creating wallet...',
	FETCHING_PASSWORD: 'Fetching Password...',
	IMPORTING_WALLET: 'Importing...',
	RESTORING_WALLET: 'Restoring...'
};

export const cloudPlatform = 'iCloud';

const getUserError = (e: any) => {
	switch (e.message) {
		case CLOUD_BACKUP_ERRORS.KEYCHAIN_ACCESS_ERROR:
			return 'You need to authenticate to proceed with the Backup process';
		case CLOUD_BACKUP_ERRORS.ERROR_DECRYPTING_DATA:
			return 'Incorrect password! Please try again.';
		case CLOUD_BACKUP_ERRORS.NO_BACKUPS_FOUND:
		case CLOUD_BACKUP_ERRORS.SPECIFIC_BACKUP_NOT_FOUND:
			return "We couldn't find your previous backup!";
		case CLOUD_BACKUP_ERRORS.ERROR_GETTING_ENCRYPTED_DATA:
			return "We couldn't access your backup at this time. Please try again later.";
		default:
			return `Error while trying to backup. Error code: ${values(CLOUD_BACKUP_ERRORS).indexOf(e.message)}`;
	}
};

const useWalletCloudBackup = () => {
	const walletCloudBackup = async ({
		handleNoLatestBackup,
		handlePasswordNotFound,
		onError,
		onSuccess,
		password,
		walletId
	}: {
		handlePasswordNotFound?: () => void;
		handleNoLatestBackup?: () => void;
		onError: (message: any) => void;
		onSuccess?: () => Promise<void>;
		password: string;
		walletId: string;
	}) => {
		const wallets = (await getAllWallets()) || {};
		const latestBackup = findLatestBackUp(wallets) || false;

		const isAvailable = await isCloudBackupAvailable();
		if (!isAvailable) {
			// handle not available
			return;
		}

		if (!password && !latestBackup) {
			// No password, No latest backup meaning
			// it's a first time backup so we need to show the password sheet
			if (handleNoLatestBackup) handleNoLatestBackup();
			return;
		}

		let fetchedPassword: string | null = password;
		let wasPasswordFetched = false;
		if (latestBackup && !password) {
			// We have a backup but don't have the password, try fetching password
			// setIsWalletLoading(walletLoadingStates.FETCHING_PASSWORD);
			// We want to make it clear why are we requesting faceID twice
			// So we delayed it to make sure the user can read before seeing the auth prompt
			await delay(1500);
			fetchedPassword = await fetchBackupPassword();
			console.log('okay, fechtou a password', fetchedPassword);
			// setIsWalletLoading(null);
			await delay(300);
			wasPasswordFetched = true;
		}

		// If we still can't get the password, handle password not found
		console.log('Tem password');
		if (!fetchedPassword) {
			console.log('Tem password');
			if (handlePasswordNotFound) handlePasswordNotFound();
			return;
		}

		// setIsWalletLoading(walletLoadingStates.BACKING_UP_WALLET);
		// We want to make it clear why are we requesting faceID twice
		// So we delayed it to make sure the user can read before seeing the auth prompt
		if (wasPasswordFetched) {
			await delay(1500);
		}

		// We have the password and we need to add it to an existing backup
		console.log('password fetched correctly');

		let updatedBackupFile = null;
		try {
			if (!latestBackup) {
				console.log(`backing up to ${cloudPlatform}`, wallets[walletId]);
				updatedBackupFile = await backupWalletToCloud(fetchedPassword, wallets[walletId]);
			} else {
				console.log(`adding wallet to ${cloudPlatform} backup`, wallets[walletId]);
				updatedBackupFile = await addWalletToCloudBackup(fetchedPassword, wallets[walletId], latestBackup);
			}
		} catch (e) {
			const userError = getUserError(e);
			if (onError) onError(userError);
			console.log(`error while trying to backup wallet to ${cloudPlatform}`);
			console.error(e);
			return;
		}

		try {
			console.log('backup completed!');
			await setWalletBackedUp(walletId, updatedBackupFile);
			// handle backup completerd
			console.log('backup saved everywhere!');
			if (onSuccess) onSuccess();
		} catch (e) {
			console.error('error while trying to save wallet backup state');
			const userError = getUserError(new Error(CLOUD_BACKUP_ERRORS.WALLET_BACKUP_STATUS_UPDATE_FAILED));
			if (onError) onError(userError);
		}
	};

	return walletCloudBackup;
};

export default useWalletCloudBackup;
