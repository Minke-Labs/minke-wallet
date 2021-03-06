import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { BasicLayout } from '@layouts';
import { LoadingScreen, SettingsHeader, Text, Modal } from '@components';
import { useNavigation, useLanguage, useWalletState } from '@hooks';
import { networks } from '@models/network';
import RNUxcam from 'react-native-ux-cam';
import Intercom from '@intercom/intercom-react-native';
import RNTestFlight from 'react-native-test-flight';
import { walletState } from '@stores/WalletStore';
import { walletCreate } from '@models/wallet';
import SettingsOption from './SettingsOption/SettingsOption';
import styles from './SettingsScreen.styles';
import DeleteModal from './DeleteModal/DeleteModal';

const SettingsScreen = () => {
	RNUxcam.tagScreenName('SettingsScreen');
	const { i18n } = useLanguage();
	const { state } = useWalletState();
	const {
		network: { chainId }
	} = state.value;
	const navigation = useNavigation();
	const [creatingWallet, setCreatingWallet] = React.useState(false);
	const [deleteModal, setDeleteModal] = React.useState(false);

	const goBack = () => navigation.goBack();
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
				<SettingsHeader title={i18n.t('SettingsScreen.title')} onPress={goBack} done={false} />

				<View style={styles.container}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
							{i18n.t('SettingsScreen.my_wallet')}
						</Text>
						<SettingsOption
							label={i18n.t('SettingsScreen.backup')}
							icon="backupStroke"
							onPress={onBackup}
						/>
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
						<SettingsOption
							label={i18n.t('SettingsScreen.enter_referral_code')}
							icon="borrowStroke"
							onPress={onEnterReferralCode}
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
						<SettingsOption
							label={i18n.t('SettingsScreen.help_centre')}
							icon="questionMark"
							onPress={onHelpCentre}
							newTab
						/>
						<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
							{i18n.t('SettingsScreen.other')}
						</Text>
						<SettingsOption
							label={i18n.t('SettingsScreen.language')}
							icon="siteStroke"
							onPress={onChangeLanguage}
						/>
						{(RNTestFlight.isTestFlight || __DEV__) && (
							<SettingsOption label="Development" icon="gear" onPress={onDevSettings} />
						)}
						<SettingsOption
							label={i18n.t('SettingsScreen.delete_wallet')}
							icon="closeStroke"
							onPress={() => setDeleteModal(true)}
							alert
						/>
					</ScrollView>
				</View>
			</BasicLayout>
			<Modal isVisible={deleteModal} onDismiss={() => setDeleteModal(false)}>
				<DeleteModal onDismiss={() => setDeleteModal(false)} />
			</Modal>
		</>
	);
};

export default SettingsScreen;
