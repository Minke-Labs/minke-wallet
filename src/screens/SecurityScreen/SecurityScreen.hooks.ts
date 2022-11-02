import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@hooks';

const disableAuthenticationKey = '@disableAuthentication';

const useSecurityScreen = () => {
	const { i18n } = useLanguage();
	const [authenticationEnabled, setAuthenticationEnabled] = useState(true);
	const onConfirm = async () => {
		const enabled = !authenticationEnabled;
		// nothing in the setting means it is enabled
		if (enabled) {
			await AsyncStorage.removeItem(disableAuthenticationKey);
		} else {
			await AsyncStorage.setItem(disableAuthenticationKey, 'true');
		}
		setAuthenticationEnabled(enabled);
	};

	const toggleSwitch = () => {
		if (authenticationEnabled) {
			Alert.alert(i18n.t('SecurityScreen.are_you_sure'), '', [
				{
					text: i18n.t('SecurityScreen.cancel'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: onConfirm
				}
			]);
		} else {
			onConfirm();
		}
	};

	useEffect(() => {
		const loadSettings = async () => {
			const stored = await AsyncStorage.getItem(disableAuthenticationKey);
			setAuthenticationEnabled(!stored);
		};

		loadSettings();
	}, []);

	return {
		toggleSwitch,
		authenticationEnabled
	};
};

export default useSecurityScreen;
