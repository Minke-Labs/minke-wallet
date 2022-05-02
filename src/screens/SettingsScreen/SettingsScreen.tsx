import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { LoadingScreen, SettingsHeader } from '@components';
import { useTheme, useNavigation, useLanguage } from '@hooks';
import { walletCreate } from '@models/wallet';
import { globalWalletState, walletState } from '@stores/WalletStore';
import SettingsOption from './SettingsOption/SettingsOption';
import styles from './SettingsScreen.styles';

const SettingsScreen = () => {
	const { i18n } = useLanguage();
	const state = useState(globalWalletState());
	const navigation = useNavigation();
	const { colors } = useTheme();
	const [creatingWallet, setCreatingWallet] = React.useState(false);

	const goBack = () => navigation.goBack();

	const onBackup = () => navigation.navigate('BackupSettingsScreen');
	// const onChangeCurrency = () => navigation.navigate('ChangeCurrencyScreen');
	const onChangeLanguage = () => navigation.navigate('ChangeLanguageScreen');
	const onChangeNetwork = () => navigation.navigate('ChangeNetworkScreen');
	const onAccounts = () => navigation.navigate('AccountsScreen');
	const onContactSupport = () => Linking.openURL('mailto:support@minke.app');
	const onDollarSettings = () => navigation.navigate('USDCoinScreen');

	const onCreateWallet = useCallback(async () => {
		setCreatingWallet(true);
		const newWallet = await walletCreate();
		state.set(await walletState(newWallet));
		setCreatingWallet(false);
		navigation.navigate('WalletCreatedScreen');
	}, [creatingWallet, navigation]);

	if (creatingWallet) {
		return <LoadingScreen title={i18n.t('SettingsScreen.creating_wallet')} />;
	}

	return (
		<BasicLayout>
			<SettingsHeader title={i18n.t('SettingsScreen.title')} onPress={goBack} done={false} />

			<View style={styles.container}>
				<ScrollView>
					<SettingsOption label={i18n.t('SettingsScreen.backup')} icon="backupStroke" onPress={onBackup} />
					{/* <SettingsOption
						label={i18n.t('SettingsScreen.currency')}
						icon="currencyStroke"
						onPress={onChangeCurrency}
					/> */}
					<SettingsOption
						label={i18n.t('SettingsScreen.network')}
						icon="networkStroke"
						onPress={onChangeNetwork}
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.language')}
						icon="siteStroke"
						onPress={onChangeLanguage}
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.new_wallet')}
						icon="walletStroke"
						onPress={onCreateWallet}
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.usd_coin')}
						icon="dollarStroke"
						onPress={onDollarSettings}
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.contact_support')}
						icon="helpStroke"
						onPress={onContactSupport}
					/>
					<View style={[styles.hr, { backgroundColor: colors.background2 }]} />
					<SettingsOption
						label={i18n.t('SettingsScreen.switch_account')}
						onPress={onAccounts}
						icon="avatarStroke"
					/>
				</ScrollView>
			</View>
		</BasicLayout>
	);
};

export default SettingsScreen;
