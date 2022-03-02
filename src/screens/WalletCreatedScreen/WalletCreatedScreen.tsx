import React from 'react';
import { Image, View } from 'react-native';
import { useState } from '@hookstate/core';
import { getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { backupSeedOnKeychain } from '@models/keychain';
import { WelcomeLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import { Text, Button, ScreenLoadingIndicator } from '@components';
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
		<WelcomeLayout
			center
			style={{
				flex: 1,
				justifyContent: 'space-between'
			}}
		>
			<Image source={walletCreatedImg} style={styles.image} />

			<View
				style={{
					width: '100%',
					alignItems: 'center'
				}}
			>
				<Text center weight="extraBold" type="h2" marginBottom={16}>
					Wallet created!
				</Text>
				<Text center color="text2" width={250}>
					Your keys your coin. Backup your wallet incase of loss.
				</Text>
			</View>
			<View style={{ width: '100%', paddingHorizontal: 24, marginBottom: 48 }}>
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
