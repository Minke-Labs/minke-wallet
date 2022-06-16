import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { LoadingScreen, SettingsHeader, Text } from '@components';
import { useNavigation, useLanguage } from '@hooks';
import { walletCreate } from '@models/wallet';
import { networks } from '@models/network';
import { globalWalletState, walletState } from '@stores/WalletStore';
import RNUxcam from 'react-native-ux-cam';
import SettingsOption from './SettingsOption/SettingsOption';
import styles from './SettingsScreen.styles';

const SettingsScreen = () => {
	RNUxcam.tagScreenName('SettingsScreen');
	const { i18n } = useLanguage();
	const state = useState(globalWalletState());
	const {
		network: { chainId }
	} = state.value;
	const navigation = useNavigation();
	const [creatingWallet, setCreatingWallet] = React.useState(false);

	const goBack = () => navigation.goBack();

	const onBackup = () => navigation.navigate('BackupSettingsScreen');
	const onChangeCountry = () => navigation.navigate('ChangeCountryScreen');
	const onChangeLanguage = () => navigation.navigate('ChangeLanguageScreen');
	const onChangeNetwork = () => navigation.navigate('ChangeNetworkScreen');
	const onAccounts = () => navigation.navigate('AccountsScreen');
	const onContactSupport = () => Linking.openURL('mailto:support@minke.app');
	const onDollarSettings = () => navigation.navigate('USDCoinScreen');
	const onSavingAccount = () => navigation.navigate('SavingAccountsScreen');

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
			<SettingsHeader title="" onPress={goBack} done={false} />

			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text weight="extraBold" marginBottom={8}>
						{i18n.t('SettingsScreen.title')}
					</Text>
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						{i18n.t('SettingsScreen.my_wallet')}
					</Text>
					<SettingsOption label={i18n.t('SettingsScreen.backup')} icon="backupStroke" onPress={onBackup} />
					<SettingsOption
						label={i18n.t('SettingsScreen.switch_account')}
						onPress={onAccounts}
						icon="switchWallet"
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.new_wallet')}
						icon="walletStroke"
						onPress={onCreateWallet}
					/>
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						{i18n.t('SettingsScreen.my_account')}
					</Text>
					<SettingsOption
						label={i18n.t('SettingsScreen.country')}
						icon="globe"
						onPress={onChangeCountry}
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.network')}
						icon="networkStroke"
						onPress={onChangeNetwork}
					/>
					<SettingsOption
						label={i18n.t('SettingsScreen.usd_coin')}
						icon="dollarStroke"
						onPress={onDollarSettings}
					/>
					{chainId !== networks.mainnet.chainId && (
						<SettingsOption
							label={i18n.t('SettingsScreen.savings_account')}
							icon="vaultStroke"
							onPress={onSavingAccount}
						/>
					)}
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						{i18n.t('SettingsScreen.help')}
					</Text>
					<SettingsOption
						label={i18n.t('SettingsScreen.contact_support')}
						icon="helpStroke"
						onPress={onContactSupport}
					/>
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						{i18n.t('SettingsScreen.other')}
					</Text>
					<SettingsOption
						label={i18n.t('SettingsScreen.language')}
						icon="siteStroke"
						onPress={onChangeLanguage}
					/>
				</ScrollView>
			</View>
		</BasicLayout>
	);
};

export default SettingsScreen;
