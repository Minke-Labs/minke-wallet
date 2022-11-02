import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@hooks';

const disableAuthenticationKey = '@disableAuthentication';

const useSecurityScreen = () => {
	const { i18n } = useLanguage();
	const [authenticationDisabled, setAuthenticationDisabled] = useState(true);
	const onConfirm = async () => {
		const enabled = !authenticationDisabled;
		// nothing in the setting means it is enabled
		if (!enabled) {
			await AsyncStorage.removeItem(disableAuthenticationKey);
		} else {
			await AsyncStorage.setItem(disableAuthenticationKey, 'true');
		}
		setAuthenticationDisabled(enabled);
	};

	const toggleSwitch = () => {
		if (!authenticationDisabled) {
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
			setAuthenticationDisabled(!!stored);
		};

		loadSettings();
	}, []);

	return {
		toggleSwitch,
		authenticationDisabled
	};
};

export default useSecurityScreen;
