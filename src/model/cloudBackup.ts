/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable operator-linebreak */
// @ts-expect-error
import RNCloudFs from 'react-native-cloud-fs';
import { Platform } from 'react-native';
import AesEncryptor from '@src/handlers/aesEncryption';
import RNFS from 'react-native-fs';
import { sortBy } from 'lodash';
import { MINKE_MASTER_KEY } from '@env';

const USERDATA_FILE = 'UserData.json';
const REMOTE_BACKUP_WALLET_DIR = 'minke.app/wallet-backups';
const encryptor = new AesEncryptor();

export const CLOUD_BACKUP_ERRORS = {
	ERROR_DECRYPTING_DATA: 'Error decrypting data',
	ERROR_GETTING_ENCRYPTED_DATA: 'Error getting encrypted data!',
	GENERAL_ERROR: 'Backup failed',
	INTEGRITY_CHECK_FAILED: 'Backup integrity check failed',
	KEYCHAIN_ACCESS_ERROR: "Couldn't read items from keychain",
	NO_BACKUPS_FOUND: 'No backups found',
	SPECIFIC_BACKUP_NOT_FOUND: 'No backup found with that name',
	UKNOWN_ERROR: 'Unknown Error',
	WALLET_BACKUP_STATUS_UPDATE_FAILED: 'Update wallet backup status failed'
};

export function isCloudBackupAvailable() {
	const ios = Platform.OS === 'ios';
	if (ios) {
		return RNCloudFs.isAvailable();
	}
	return true;
}

export const encryptAndSaveDataToCloud = async (data: any, password: any, filename: any) => {
	const ios = Platform.OS === 'ios';
	const android = Platform.OS === 'android';
	// Encrypt the data
	try {
		const encryptedData = await encryptor.encrypt(password, JSON.stringify(data));
		// Store it on the FS first
		const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
		await RNFS.writeFile(path, encryptedData || '', 'utf8');
		const sourceUri = { path };

		const destinationPath = `${REMOTE_BACKUP_WALLET_DIR}/${filename}`;
		const mimeType = 'application/json';
		// Only available to our app
		const scope = 'hidden';
		if (android) {
			await RNCloudFs.loginIfNeeded();
		}
		const result = await RNCloudFs.copyToCloud({
			mimeType,
			scope,
			sourcePath: sourceUri,
			targetPath: destinationPath
		});
		// Now we need to verify the file has been stored in the cloud
		const exists = await RNCloudFs.fileExists(
			ios
				? {
						scope,
						targetPath: destinationPath
				  }
				: {
						fileId: result,
						scope
				  }
		);

		if (!exists) {
			console.error('Backup doesnt exist after completion');
			const error = new Error(CLOUD_BACKUP_ERRORS.INTEGRITY_CHECK_FAILED);
			throw error;
		}

		await RNFS.unlink(path);
		return filename;
	} catch (e) {
		console.error('Error during encryptAndSaveDataToCloud', e);
		throw new Error(CLOUD_BACKUP_ERRORS.GENERAL_ERROR);
	}
};

export const getDataFromCloud = async (backupPassword: any, filename = '') => {
	const android = Platform.OS === 'android';
	const ios = Platform.OS === 'ios';

	if (android) {
		await RNCloudFs.loginIfNeeded();
	}

	const backups = await RNCloudFs.listFiles({
		scope: 'hidden',
		targetPath: REMOTE_BACKUP_WALLET_DIR
	});

	if (!backups || !backups.files || !backups.files.length) {
		console.error('No backups found');
		const error = new Error(CLOUD_BACKUP_ERRORS.NO_BACKUPS_FOUND);
		throw error;
	}

	let document;
	if (filename) {
		if (ios) {
			// .icloud are files that were not yet synced
			document = backups.files.find((file: any) => file.name === filename || file.name === `.${filename}.icloud`);
		} else {
			document = backups.files.find((file: any) => file.name === `${REMOTE_BACKUP_WALLET_DIR}/${filename}`);
		}

		if (!document) {
			console.error('No backup found with that name!', filename);
			const error = new Error(CLOUD_BACKUP_ERRORS.SPECIFIC_BACKUP_NOT_FOUND);
			throw error;
		}
	} else {
		const sortedBackups = sortBy(backups.files, 'lastModified').reverse();
		// eslint-disable-next-line prefer-destructuring
		document = sortedBackups[0];
	}

	const encryptedData = await RNFS.readFile(document.path, 'utf8');

	if (encryptedData) {
		const backedUpDataStringified = await encryptor.decrypt(backupPassword, encryptedData);
		if (backedUpDataStringified) {
			const backedUpData = JSON.parse(backedUpDataStringified);
			return backedUpData;
		}
		console.error('We couldnt decrypt the data');
		const error = new Error(CLOUD_BACKUP_ERRORS.ERROR_DECRYPTING_DATA);
		throw error;
	}
	console.error('We couldnt get the encrypted data');
	const error = new Error(CLOUD_BACKUP_ERRORS.ERROR_GETTING_ENCRYPTED_DATA);
	throw error;
};

export const backupUserDataIntoCloud = async (data: any) => {
	const filename = USERDATA_FILE;
	const password = MINKE_MASTER_KEY;
	return encryptAndSaveDataToCloud(data, password, filename);
};

export async function fetchAllBackups() {
	const android = Platform.OS === 'android';
	if (android) {
		await RNCloudFs.loginIfNeeded();
	}
	return RNCloudFs.listFiles({
		scope: 'hidden',
		targetPath: REMOTE_BACKUP_WALLET_DIR
	});
}
