import { getItemAsync, SecureStoreOptions, setItemAsync, WHEN_UNLOCKED } from 'expo-secure-store';

export const publicAccessControlOptions: SecureStoreOptions = {
	keychainAccessible: WHEN_UNLOCKED
};

export async function saveObject(
	key: string,
	value: Object,
	accessControlOptions = publicAccessControlOptions
): Promise<void> {
	const jsonValue = JSON.stringify(value);
	return setItemAsync(key, jsonValue, accessControlOptions);
}

export async function loadObject(key: string, options?: SecureStoreOptions): Promise<null | Object> {
	const jsonValue = await getItemAsync(key, options);
	if (!jsonValue) return null;

	try {
		return JSON.parse(jsonValue);
	} catch (err) {
		console.log(err);
	}
	return null;
}

export const minkeWalletPrefix = 'minke_wallet_';

export const searchForMinkeBackups = async (): Promise<string[]> => {
	let counter = 0;
	let key = `${minkeWalletPrefix}${counter}`;
	let backup = (await loadObject(key, publicAccessControlOptions)) as string | null;
	const backups: string[] = [];
	while (backup) {
		counter += 1;
		backups.push(backup);
		key = `${minkeWalletPrefix}${counter}`;
		// eslint-disable-next-line no-await-in-loop
		backup = (await loadObject(key, publicAccessControlOptions)) as string | null;
	}

	return backups;
};

export const backupSeedOnKeychain = async (seed: string): Promise<boolean> => {
	const seedValue = seed;
	let counter = 0;
	let key = `${minkeWalletPrefix}${counter}`;
	let saved = await loadObject(key, publicAccessControlOptions);

	while (saved) {
		if (saved === seedValue) {
			return true;
		}
		counter += 1;
		key = `${minkeWalletPrefix}${counter}`;
		// eslint-disable-next-line no-await-in-loop
		saved = await loadObject(key, publicAccessControlOptions);
	}

	if (seedValue) {
		await saveObject(key, seedValue);
		const savedValue = await loadObject(key, publicAccessControlOptions);

		return seedValue === savedValue;
	}

	return false;
};
