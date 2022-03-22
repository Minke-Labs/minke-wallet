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
		console.error(err);
	}
	return null;
}
