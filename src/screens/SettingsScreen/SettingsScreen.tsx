import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { LoadingScreen, SettingsHeader, Text } from '@components';
import { useNavigation } from '@hooks';
import { walletCreate } from '@models/wallet';
import { globalWalletState, walletState } from '@stores/WalletStore';
import styles from './SettingsScreen.styles';
import SettingsOption from './SettingsOption/SettingsOption';

const SettingsScreen = () => {
	const state = useState(globalWalletState());
	const navigation = useNavigation();
	const [creatingWallet, setCreatingWallet] = React.useState(false);

	const goBack = () => navigation.goBack();

	const onBackup = () => navigation.navigate('BackupSettingsScreen');
	// const onChangeCurrency = () => navigation.navigate('ChangeCurrencyScreen');
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
		return <LoadingScreen title="Creating wallet" />;
	}

	return (
		<BasicLayout>
			<SettingsHeader title="" onPress={goBack} done={false} />

			<View style={styles.container}>
				<ScrollView>
					<Text weight="extraBold" marginBottom={8}>
						Settings
					</Text>
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						My Wallet
					</Text>
					<SettingsOption label="Backup" icon="backupStroke" onPress={onBackup} />
					<SettingsOption label="Switch wallet" onPress={onAccounts} icon="avatarStroke" />
					<SettingsOption label="New Wallet" icon="walletStroke" onPress={onCreateWallet} />
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						My Account
					</Text>
					<SettingsOption label="Network" icon="networkStroke" onPress={onChangeNetwork} />
					<SettingsOption label="USD Asset" icon="dollarStroke" onPress={onDollarSettings} />
					<SettingsOption label="Savings Account" icon="vaultStroke" onPress={onSavingAccount} />
					<Text weight="semiBold" type="a" color="text3" marginBottom={16}>
						Help
					</Text>
					<SettingsOption label="Contact Support" icon="helpStroke" onPress={onContactSupport} />
				</ScrollView>
			</View>
		</BasicLayout>
	);
};

export default SettingsScreen;
