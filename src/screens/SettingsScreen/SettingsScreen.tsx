import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import * as Linking from 'expo-linking';
import { BasicLayout } from '@layouts';
import { View, LoadingScreen, Header, Text, ModalBase, IconItem } from '@components';
import { useNavigation, useLanguage } from '@hooks';
import { networks } from '@models/network';
import Intercom from '@intercom/intercom-react-native';
import RNTestFlight from 'react-native-test-flight';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { walletCreate } from '@models/wallet';
import { useState } from '@hookstate/core';
import styles from './SettingsScreen.styles';
import DeleteModal from './DeleteModal/DeleteModal';

const SettingsScreen = () => {
	RNUxcam.tagScreenName('SettingsScreen');
	const { i18n } = useLanguage();
	const state = useState(globalWalletState());
	const {
		network: { chainId }
	} = state.value;
	const navigation = useNavigation();
	const [creatingWallet, setCreatingWallet] = React.useState(false);
	const [deleteModal, setDeleteModal] = React.useState(false);

	const onBackup = () => navigation.navigate('BackupSettingsScreen');
	const onChangeCountry = () => navigation.navigate('ChangeCountryScreen');
	const onChangeLanguage = () => navigation.navigate('ChangeLanguageScreen');
	const onDevSettings = () => navigation.navigate('DevSettingsScreen');
	const onChangeNetwork = () => navigation.navigate('ChangeNetworkScreen');
	const onAccounts = () => navigation.navigate('AccountsScreen');
	const onContactSupport = () => Linking.openURL('mailto:support@minke.app');
	const onDollarSettings = () => navigation.navigate('USDCoinScreen');
	const onSavingAccount = () => navigation.navigate('SavingAccountsScreen');
	const onEnterReferralCode = () => navigation.navigate('EnterReferralCodeScreen');
	const onHelpCentre = () => Intercom.displayHelpCenter();
	const onEnterSecurity = () => navigation.navigate('SecurityScreen');

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
		<>
			<BasicLayout>
				<Header title={i18n.t('SettingsScreen.title')} />

				<View style={styles.container}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
							{i18n.t('SettingsScreen.my_wallet')}
						</Text>
						<IconItem
							title={i18n.t('SettingsScreen.backup')}
							icon="backup"
							onPress={onBackup}
							rightButton
							mb="m"
						/>
						<IconItem
							title={i18n.t('SettingsScreen.switch_account')}
							onPress={onAccounts}
							icon="switchWallet"
							rightButton
							mb="m"
						/>
						<IconItem
							title={i18n.t('SettingsScreen.new_wallet')}
							icon="walletStroke"
							onPress={onCreateWallet}
							rightButton
							mb="m"
						/>
						<IconItem
							title={i18n.t('SettingsScreen.enter_referral_code')}
							icon="borrowStroke"
							onPress={onEnterReferralCode}
							rightButton
							mb="m"
						/>
						<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
							{i18n.t('SettingsScreen.my_account')}
						</Text>
						<IconItem
							title={i18n.t('SettingsScreen.country')}
							icon="globe"
							onPress={onChangeCountry}
							rightButton
							mb="m"
						/>
						<IconItem
							title={i18n.t('SettingsScreen.network')}
							icon="networkStroke"
							onPress={onChangeNetwork}
							rightButton
							mb="m"
						/>
						<IconItem
							title={i18n.t('SettingsScreen.usd_coin')}
							icon="dollar"
							onPress={onDollarSettings}
							rightButton
							mb="m"
						/>
						{chainId !== networks.mainnet.chainId && (
							<IconItem
								title={i18n.t('SettingsScreen.savings_account')}
								icon="vault"
								onPress={onSavingAccount}
								rightButton
								mb="m"
							/>
						)}

						<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
							{i18n.t('SettingsScreen.help')}
						</Text>

						<IconItem
							title={i18n.t('SettingsScreen.contact_support')}
							icon="help"
							onPress={onContactSupport}
							rightButton
							mb="m"
						/>

						<IconItem
							title={i18n.t('SettingsScreen.help_centre')}
							icon="questionMark"
							onPress={onHelpCentre}
							newTab
							mb="m"
						/>

						<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
							{i18n.t('SettingsScreen.other')}
						</Text>

						<IconItem
							title={i18n.t('SettingsScreen.language')}
							icon="siteStroke"
							onPress={onChangeLanguage}
							rightButton
							mb="m"
						/>

						<IconItem
							title={i18n.t('SettingsScreen.security')}
							icon="gear"
							onPress={onEnterSecurity}
							rightButton
							mb="m"
						/>

						{(RNTestFlight.isTestFlight || __DEV__) && (
							<IconItem title="Development" icon="gear" onPress={onDevSettings} rightButton mb="m" />
						)}

						<IconItem
							title={i18n.t('SettingsScreen.delete_wallet')}
							icon="close"
							onPress={() => setDeleteModal(true)}
							alert
							mb="m"
						/>
					</ScrollView>
				</View>
			</BasicLayout>
			<ModalBase isVisible={deleteModal} onDismiss={() => setDeleteModal(false)}>
				<DeleteModal onDismiss={() => setDeleteModal(false)} />
			</ModalBase>
		</>
	);
};

export default SettingsScreen;
