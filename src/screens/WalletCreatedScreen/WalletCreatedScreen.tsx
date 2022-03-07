import React from 'react';
import { Image, View } from 'react-native';
import { useState } from '@hookstate/core';
import { getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { backupSeedOnKeychain } from '@models/keychain';
import { WelcomeLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import { Text, Button, ScreenLoadingIndicator } from '@components';
import { useNavigation } from '@hooks';
import styles from './WalletCreatedScreen.styles';

const WalletCreatedScreen = () => {
	const navigation = useNavigation();

	const backupManually = () => navigation.navigate('BackupScreen');
	const onFinish = () => navigation.navigate('WalletScreen');

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <ScreenLoadingIndicator />;

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
		<WelcomeLayout center style={styles.container}>
			<Image source={walletCreatedImg} style={styles.image} />

			<View style={styles.textContainer}>
				<Text center weight="extraBold" type="h2" marginBottom={16}>
					Wallet created!
				</Text>
				<Text center color="text2" width={250}>
					Your keys your coin. Backup your wallet incase of loss.
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button
					title="Back up to iCloud"
					iconRight="cloudStroke"
					onPress={backupOnKeychain}
					marginBottom={14}
				/>
				<Button title="Back up manually" mode="text" onPress={backupManually} />
			</View>
		</WelcomeLayout>
	);
};

export default WalletCreatedScreen;
