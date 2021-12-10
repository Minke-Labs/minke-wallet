import { getItemAsync, SecureStoreOptions, setItemAsync } from 'expo-secure-store';

export async function saveObject(key: string, value: Object, accessControlOptions: SecureStoreOptions): Promise<void> {
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
