import { delay } from '@helpers/utilities';
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthPrompProps {
	onSuccess: () => void;
	onError?: (error: any) => void;
}

interface UseAuthenticationProps {
	showAuthenticationPrompt: ({ onSuccess, onError }: AuthPrompProps) => void;
}

const useAuthentication = (): UseAuthenticationProps => {
	const showAuthenticationPrompt = async ({ onSuccess, onError }: AuthPrompProps) => {
		try {
			const stored = await AsyncStorage.getItem('@disableAuthentication');
			const authenticationDisabled = !!stored;

			if (authenticationDisabled) {
				onSuccess();
				return;
			}

			// Authenticate user
			const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
			const { success } = await LocalAuthentication.authenticateAsync();

			if (success || securityLevel === LocalAuthentication.SecurityLevel.NONE) {
				await delay(1000);
				onSuccess();
			}
		} catch (error: any) {
			if (onError) {
				onError!(error);
			} else {
				Alert.alert('An error has occurred', error.message);
			}
		}
	};

	return { showAuthenticationPrompt };
};

export default useAuthentication;
