import { forEach } from 'lodash';
import { Platform } from 'react-native';
import { requestSharedWebCredentials } from 'react-native-keychain';
import { encryptAndSaveDataToCloud, getDataFromCloud } from './cloudBackup';
import { AllMinkeWallets, getPrivateKey, getSeedPhrase, MinkeWallet } from './wallet';

type BackupPassword = string;

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

async function extractSecretsForWallet(wallet: MinkeWallet) {
	const secrets = {} as { [key: string]: string };
	const secret = (await getSeedPhrase(wallet.id)) || (await getPrivateKey(wallet.address));
	if (secret) secrets[wallet.id] = secret;
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

	console.log({ backup });
	console.log({ password });
	console.log({ filename });
	return encryptAndSaveDataToCloud(backup, password, filename);
}

export const findLatestBackUp = (wallets: AllMinkeWallets): string | null => {
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
