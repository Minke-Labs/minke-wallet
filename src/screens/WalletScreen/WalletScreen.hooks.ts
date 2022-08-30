import { useNavigation } from '@hooks';

export const useWalletScreen = () => {
	const navigation = useNavigation();

	const onSettingsPress = () => navigation.navigate('SettingsScreen');
	const onSwitchAccounts = () => navigation.navigate('AccountsScreen');
	const onPointsPress = () => navigation.navigate('ReferralScreen');

	return {
		onSettingsPress,
		onSwitchAccounts,
		onPointsPress
	};
};
