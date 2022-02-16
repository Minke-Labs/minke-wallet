import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { backupSeedOnKeychain } from '@models/keychain';
import React from 'react';
import { Image } from 'react-native';
import { WelcomeLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import { Text, Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './WalletCreatedScreen.styles';
import { RootStackParamList } from '../../routes/types.routes';

const WalletCreatedScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const backupManually = () => navigation.navigate('Backup');
	const onFinish = () => navigation.navigate('Wallet');

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;

	const backupOnKeychain = async () => {
		const toBackup = seed.value || walletState.privateKey.value;
		if (toBackup) {
			const backedUp = await backupSeedOnKeychain(toBackup);
			if (backedUp) {
				onFinish();
			} else {
				backupManually();
			}
		}
	};

	return (
		<WelcomeLayout center>
			<Image source={walletCreatedImg} style={styles.image} />
			<Text center weight="extraBold" type="h2" width={273} marginBottom={16}>
				Wallet created!
			</Text>
			<Text center color="text2" width={258} marginBottom={48}>
				Your keys your coin. Backup your wallet incase of loss.
			</Text>
			<Button title="Back up to iCloud" iconRight="cloudStroke" onPress={backupOnKeychain} marginBottom={14} />
			<Button title="Back up manually" mode="text" onPress={backupManually} />
		</WelcomeLayout>
	);
};

export default WalletCreatedScreen;
