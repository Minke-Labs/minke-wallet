import { CLOUD_BACKUP_ERRORS, isCloudBackupAvailable } from '@models/cloudBackup';
import {
	addWalletToCloudBackup,
	backupWalletToCloud,
	fetchBackupPassword,
	findLatestBackUpOnICloud
} from '@models/backup';
import { delay } from '@helpers/utilities';
import { values } from 'lodash';
import { getAllWallets, setWalletBackedUp } from '@models/wallet';
import { useState } from 'react';
import i18n from '@localization';
import Logger from '@utils/logger';

export const cloudPlatform = 'iCloud';

const walletLoadingStates = {
	BACKING_UP_WALLET: i18n.t('iCloudBackup.BACKING_UP_WALLET'),
	CREATING_WALLET: i18n.t('iCloudBackup.CREATING_WALLET'),
	FETCHING_PASSWORD: i18n.t('iCloudBackup.FETCHING_PASSWORD'),
	IMPORTING_WALLET: i18n.t('iCloudBackup.IMPORTING_WALLET'),
	RESTORING_WALLET: i18n.t('iCloudBackup.RESTORING_WALLET')
};

const getUserError = (e: any) => {
	switch (e.message) {
		case CLOUD_BACKUP_ERRORS.KEYCHAIN_ACCESS_ERROR:
			return i18n.t('iCloudBackup.errors.KEYCHAIN_ACCESS_ERROR');
		case CLOUD_BACKUP_ERRORS.ERROR_DECRYPTING_DATA:
			return i18n.t('iCloudBackup.errors.ERROR_DECRYPTING_DATA');
		case CLOUD_BACKUP_ERRORS.NO_BACKUPS_FOUND:
		case CLOUD_BACKUP_ERRORS.SPECIFIC_BACKUP_NOT_FOUND:
			return i18n.t('iCloudBackup.errors.NO_BACKUPS_FOUND');
		case CLOUD_BACKUP_ERRORS.ERROR_GETTING_ENCRYPTED_DATA:
			return i18n.t('iCloudBackup.errors.ERROR_GETTING_ENCRYPTED_DATA');
		default:
			return i18n.t('iCloudBackup.errors.GENERIC_ERROR', {
				code: values(CLOUD_BACKUP_ERRORS).indexOf(e.message)
			});
	}
};

const useWalletCloudBackup = () => {
	const [isWalletLoading, setIsWalletLoading] = useState<string | null>();

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
		password?: string;
		walletId: string;
	}) => {
		const wallets = (await getAllWallets()) || {};
		const latestBackup = (await findLatestBackUpOnICloud()) || false;

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

		let fetchedPassword: string | null | undefined = password;
		let wasPasswordFetched = false;
		if (latestBackup && !password) {
			// We have a backup but don't have the password, try fetching password
			setIsWalletLoading(walletLoadingStates.FETCHING_PASSWORD);
			// We want to make it clear why are we requesting faceID twice
			// So we delayed it to make sure the user can read before seeing the auth prompt
			await delay(1500);
			fetchedPassword = await fetchBackupPassword();
			setIsWalletLoading(null);
			await delay(300);
			wasPasswordFetched = true;
		}

		// If we still can't get the password, handle password not found
		if (!fetchedPassword) {
			if (handlePasswordNotFound) handlePasswordNotFound();
			return;
		}

		setIsWalletLoading(walletLoadingStates.BACKING_UP_WALLET);
		// We want to make it clear why are we requesting faceID twice
		// So we delayed it to make sure the user can read before seeing the auth prompt
		if (wasPasswordFetched) {
			await delay(1500);
		}

		// We have the password and we need to add it to an existing backup
		let updatedBackupFile = null;
		try {
			if (!latestBackup) {
				updatedBackupFile = await backupWalletToCloud(fetchedPassword, wallets[walletId]);
			} else {
				updatedBackupFile = await addWalletToCloudBackup(fetchedPassword, wallets[walletId], latestBackup);
			}
		} catch (e) {
			setIsWalletLoading(null);
			const userError = getUserError(e);
			Logger.error(e);
			if (onError) onError(userError);
			return;
		}

		try {
			await setWalletBackedUp(walletId, updatedBackupFile);
			setIsWalletLoading(null);
			if (onSuccess) await onSuccess();
		} catch (e) {
			setIsWalletLoading(null);
			const userError = getUserError(new Error(CLOUD_BACKUP_ERRORS.WALLET_BACKUP_STATUS_UPDATE_FAILED));
			Logger.error(userError);
			if (onError) onError(userError);
		}
	};

	return { walletCloudBackup, isWalletLoading };
};

export default useWalletCloudBackup;
