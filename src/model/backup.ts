/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { privateKeyKey, seedPhraseKey } from '@src/utils/keychainConstants';
import { endsWith, forEach } from 'lodash';
import { Platform } from 'react-native';
import { Options, requestSharedWebCredentials, setSharedWebCredentials } from 'react-native-keychain';
import * as keychain from './keychain';
import { encryptAndSaveDataToCloud, fetchAllBackups, getDataFromCloud } from './cloudBackup';
import { AllMinkeWallets, getPrivateKey, getSeedPhrase, MinkeWallet, restoreWalletByMnemonic } from './wallet';

type BackupPassword = string;

interface BackedUpData {
	[key: string]: string;
}

// Attempts to save the password to decrypt the backup from the iCloud keychain
export async function saveBackupPassword(password: BackupPassword): Promise<void> {
	const ios = Platform.OS === 'ios';
	try {
		if (ios) {
			await setSharedWebCredentials('minke.app', 'Backup Password', password);
		}
	} catch (e) {
		console.log("Didn't save backup password on iCloud", e);
	}
}

// Attempts to fetch the password to decrypt the backup from the iCloud keychain
export const fetchBackupPassword = async (): Promise<null | BackupPassword> => {
	const android = Platform.OS === 'android';
	if (android) {
		return null;
	}

	try {
		const results = await requestSharedWebCredentials();
		if (results) {
			return results.password as BackupPassword;
		}
		return null;
	} catch (e) {
		console.error(e);
		return null;
	}
};

async function extractSecretsForWallet({ id, address }: MinkeWallet) {
	const secrets = {} as { [key: string]: string };
	let key = `${id}_${seedPhraseKey}`;
	let secret = await getSeedPhrase(id);
	if (!secret) {
		secret = await getPrivateKey(address);
		key = `${address}_${privateKeyKey}`;
	}
	if (secret) secrets[key] = secret;
	return secrets;
}

export const backupWalletToCloud = async (password: BackupPassword, wallet: MinkeWallet) => {
	const now = Date.now();

	const secrets = await extractSecretsForWallet(wallet);
	const data = {
		createdAt: now,
		secrets
	};
	return encryptAndSaveDataToCloud(data, password, `backup_${now}.json`);
};

export async function addWalletToCloudBackup(
	password: BackupPassword,
	wallet: MinkeWallet,
	filename: string
): Promise<null | boolean> {
	const backup = await getDataFromCloud(password, filename);
	const now = Date.now();
	const secrets = await extractSecretsForWallet(wallet);

	backup.updatedAt = now;
	// Merge existing secrets with the ones from this wallet
	backup.secrets = {
		...backup.secrets,
		...secrets
	};

	return encryptAndSaveDataToCloud(backup, password, filename);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findLatestBackUp = (wallets: AllMinkeWallets): string | null => {
	let latestBackup: number | null = null;
	let filename: string | null = null;

	forEach(wallets, (wallet: MinkeWallet) => {
		// Check if there's a wallet backed up
		if (wallet.backedUp && wallet.backupDate && wallet.backupFile) {
			// If there is one, let's grab the latest backup
			if (!latestBackup || wallet.backupDate > latestBackup) {
				filename = wallet.backupFile;
				latestBackup = wallet.backupDate;
			}
		}
	});

	return filename;
};

export const findLatestBackUpOnICloud = async (): Promise<string | null> => {
	const { files } = await fetchAllBackups();
	const filteredFiles = files.filter((file: any) => file.name.indexOf('backup_') !== -1);
	let latestBackup: number | null = null;
	let filename: string | null = null;

	forEach(filteredFiles, (file: any) => {
		const timestamp = Number(
			file.name
				.replace('.backup_', '')
				.replace('backup_', '')
				.replace('.json', '')
				.replace('.icloud', '')
				.replace('minke.app/wallet-backups/', '')
		);
		// Check if there's a wallet backed up
		// If there is one, let's grab the latest backup
		if (!latestBackup || timestamp > latestBackup) {
			filename = file.name;
			latestBackup = timestamp;
		}
	});

	return filename;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function restoreCurrentBackupIntoKeychain(backedUpData: BackedUpData): Promise<boolean> {
	try {
		// Access control config per each type of key
		const privateAccessControlOptions = await keychain.getPrivateAccessControlOptions();

		await Promise.all(
			Object.keys(backedUpData).map(async (key) => {
				const value = backedUpData[key];
				let accessControl: Options = keychain.publicAccessControlOptions;
				if (endsWith(key, seedPhraseKey) || endsWith(key, privateKeyKey)) {
					accessControl = privateAccessControlOptions;
				}
				if (typeof value === 'string') {
					return keychain.saveString(key, value, accessControl);
				}
				return keychain.saveObject(key, value, accessControl);
			})
		);

		return true;
	} catch (e) {
		console.error('error in restoreBackupIntoKeychain');
		return false;
	}
}

const restoreSpecificBackupIntoKeychain = async (backedUpData: BackedUpData): Promise<boolean> => {
	try {
		// Re-import all the seeds (and / or pkeys) one by one
		for (const key of Object.keys(backedUpData)) {
			if (endsWith(key, seedPhraseKey) || endsWith(key, privateKeyKey)) {
				const seedphrase = backedUpData[key];
				await restoreWalletByMnemonic(seedphrase, backedUpData.filename);
			}
		}
		return true;
	} catch (e) {
		console.error('error in restoreSpecificBackupIntoKeychain');
		return false;
	}
};

export const restoreCloudBackup = async (password: BackupPassword): Promise<boolean> => {
	try {
		const filename = await findLatestBackUpOnICloud();

		if (!filename) {
			return false;
		}
		// 2- download that backup
		const data = await getDataFromCloud(password, filename);
		if (!data) {
			throw new Error('Invalid password');
		}
		const dataToRestore = {
			filename,
			...data.secrets
		};

		return restoreSpecificBackupIntoKeychain(dataToRestore);
	} catch (e) {
		console.error('Error while restoring back up');
		return false;
	}
};
