import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { LoadingScreen, SettingsHeader } from '@components';
import { useTheme, useNavigation } from '@hooks';
import { walletCreate } from '@models/wallet';
import { globalWalletState, walletState } from '@stores/WalletStore';
import styles from './SettingsScreen.styles';
import SettingsOption from './SettingsOption/SettingsOption';

const SettingsScreen = () => {
	const state = useState(globalWalletState());
	const navigation = useNavigation();
	const { colors } = useTheme();
	const [creatingWallet, setCreatingWallet] = React.useState(false);

	const goBack = () => navigation.goBack();

	const onBackup = () => navigation.navigate('BackupSettingsScreen');
	// const onChangeCurrency = () => navigation.navigate('ChangeCurrencyScreen');
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
		return <LoadingScreen title="Creating wallet" />;
	}

	return (
		<BasicLayout>
			<SettingsHeader title="Settings" onPress={goBack} done={false} />

			<View style={styles.container}>
				<ScrollView>
					<SettingsOption label="Backup" icon="backupStroke" onPress={onBackup} />
					{/* <SettingsOption label="Currency" icon="currencyStroke" onPress={onChangeCurrency} /> */}
					<SettingsOption label="Network" icon="networkStroke" onPress={onChangeNetwork} />
					<SettingsOption label="New Wallet" icon="walletStroke" onPress={onCreateWallet} />
					<SettingsOption label="US Dollar coin" icon="dollarStroke" onPress={onDollarSettings} />
					<SettingsOption label="Contact Support" icon="helpStroke" onPress={onContactSupport} />
					<View style={[styles.hr, { backgroundColor: colors.background2 }]} />
					<SettingsOption label="Switch account" onPress={onAccounts} icon="avatarStroke" />
				</ScrollView>
			</View>
		</BasicLayout>
	);
};

export default SettingsScreen;
