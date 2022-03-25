import * as Sentry from 'sentry-expo';
/* eslint-disable operator-linebreak */
import { forEach, isNil } from 'lodash';
import DeviceInfo from 'react-native-device-info';
import {
	ACCESS_CONTROL,
	ACCESSIBLE,
	AUTHENTICATION_TYPE,
	canImplyAuthentication,
	getAllInternetCredentials,
	getAllInternetCredentialsKeys,
	getInternetCredentials,
	getSupportedBiometryType,
	hasInternetCredentials,
	Options,
	resetInternetCredentials,
	Result,
	setInternetCredentials,
	UserCredentials
} from 'react-native-keychain';
import { delay } from '../helpers/utilities';

interface AnonymousKey {
	length: number;
	nil: boolean;
	type: string;
}

interface AnonymousKeyData {
	[key: string]: AnonymousKey;
}

export async function saveString(key: string, value: string, accessControlOptions: Options): Promise<void> {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		try {
			await setInternetCredentials(key, key, value, accessControlOptions);
			resolve();
		} catch (e) {
			console.error('Keychain write first attempt failed');
			await delay(1000);
			try {
				await setInternetCredentials(key, key, value, accessControlOptions);
				resolve();
				// eslint-disable-next-line @typescript-eslint/no-shadow
			} catch (e) {
				console.error('Keychain write second attempt failed');
				reject(e);
			}
		}
	});
}

export async function loadString(key: string, options?: Options): Promise<null | string | -1 | -2> {
	try {
		const credentials = await getInternetCredentials(key, options);
		if (credentials) {
			return credentials.password;
		}
	} catch (err: any) {
		if (err.toString() === 'Error: User canceled the operation.') {
			return -1;
		}
		if (err.toString() === 'Error: Wrapped error: User not authenticated') {
			return -2;
		}
		if (err.toString() === 'Error: The user name or passphrase you entered is not correct.') {
			// Try reading from keychain once more
			console.error('Keychain read first attempt failed');
			await delay(1000);
			try {
				const credentials = await getInternetCredentials(key, options);
				if (credentials) {
					return credentials.password;
				}
			} catch (e) {
				if (err.toString() === 'Error: User canceled the operation.') {
					return -1;
				}
				if (err.toString() === 'Error: Wrapped error: User not authenticated') {
					return -2;
				}
				console.error('Keychain read second attempt failed');
				console.error(err);
			}
			return null;
		}
		console.error(err);
	}
	return null;
}

export async function saveObject(key: string, value: Object, accessControlOptions: Options): Promise<void> {
	const jsonValue = JSON.stringify(value);
	return saveString(key, jsonValue, accessControlOptions);
}

export async function loadObject(key: string, options?: Options): Promise<null | Object | -1 | -2> {
	const jsonValue = await loadString(key, options);
	if (!jsonValue) return null;
	if (jsonValue === -1 || jsonValue === -2) {
		return jsonValue;
	}
	try {
		const objectValue = JSON.parse(jsonValue);
		return objectValue;
	} catch (err) {
		Sentry.Native.captureException(err);
	}
	return null;
}

export async function remove(key: string): Promise<void> {
	try {
		await resetInternetCredentials(key);
	} catch (err) {
		console.error(err);
	}
}

export async function loadAllKeys(): Promise<null | UserCredentials[]> {
	try {
		const response = await getAllInternetCredentials();
		if (response) {
			return response.results;
		}
	} catch (err) {
		console.error(err);
	}
	return null;
}

export async function getAllKeysAnonymized(): Promise<null | AnonymousKeyData> {
	const data: AnonymousKeyData = {};
	const results = await loadAllKeys();
	forEach(results, (result) => {
		data[result?.username] = {
			length: result?.password?.length,
			nil: isNil(result?.password),
			type: typeof result?.password
		};
	});
	return data;
}

export async function loadAllKeysOnly(): Promise<null | string[]> {
	try {
		const response = await getAllInternetCredentialsKeys();
		if (response) {
			return response.results;
		}
	} catch (err) {
		console.error(err);
	}
	return null;
}

export async function hasKey(key: string): Promise<boolean | Result> {
	try {
		const result = await hasInternetCredentials(key);
		return result;
	} catch (err) {
		console.error(err);
	}
	return false;
}

export async function wipeKeychain(): Promise<void> {
	try {
		const results = await loadAllKeys();
		if (results) {
			await Promise.all(results?.map((result) => resetInternetCredentials(result.username)));
		}
	} catch (e) {
		console.error(e);
	}
}

export const publicAccessControlOptions = {
	accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY
};

export async function getPrivateAccessControlOptions(): Promise<Options> {
	let res = {};
	try {
		let canAuthenticate;

		if (ios) {
			canAuthenticate = await canImplyAuthentication({
				authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS
			});
		} else {
			const hasBiometricsEnabled = await getSupportedBiometryType();
			canAuthenticate = !!hasBiometricsEnabled;
		}

		let isSimulator = false;

		if (canAuthenticate) {
			isSimulator = __DEV__ && (await DeviceInfo.isEmulator());
		}
		if (canAuthenticate && !isSimulator) {
			res = {
				accessControl: ios
					? ACCESS_CONTROL.USER_PRESENCE
					: ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
				accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY
			};
		}
		// eslint-disable-next-line no-empty
	} catch (e) {}

	return res;
}
