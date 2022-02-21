import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import { WelcomeLayout } from '@layouts';
import { Button, Text, Icon } from '@components';
import AppLoading from 'expo-app-loading';
import { searchForMinkeBackups, backupSeedOnKeychain } from '@src/model/keychain';
import { smallWalletAddress, getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { backupImg } from '@images';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types.routes';
import styles from './BackupSettingsScreen.styles';

const BackupSettingsScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const state = useState(globalWalletState());
	const { address } = state.value;
	const wallet = smallWalletAddress(address);
	const [backups, setBackups] = React.useState<string[]>([]);

	const loadBackups = async () => {
		setBackups(await searchForMinkeBackups());
	};

	useEffect(() => {
		loadBackups();
	}, []);

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;

	const toBackup = seed.value || walletState.privateKey.value;

	const backupOnKeychain = async () => {
		if (toBackup) {
			const backedUp = await backupSeedOnKeychain(toBackup);
			if (backedUp) {
				loadBackups();
			} else {
				navigation.navigate('Backup');
			}
		}
	};

	return (
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Wallet')}>
					<Text weight="medium" color="text7" type="a">
						Done
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.padding}>
				<View style={{ width: '100%', marginBottom: 58 }}>
					<Text weight="extraBold" type="h3">
						Backup
					</Text>
					<Text>{wallet}</Text>
				</View>

				<Image source={backupImg} style={styles.image} />

				{backups.includes(toBackup) ? (
					<>
						<Text weight="extraBold" type="h2" center marginBottom={24}>
							Your Wallet is Backed Up!
						</Text>
						<Text weight="medium" center marginBottom={40}>
							If you lose this device you can recover your encrpyted wallet backup from iCloud. Remember
							to activate the iCloud Keychain backup
						</Text>
						{seed.value ? (
							<Button onPress={() => navigation.navigate('Backup')} title="View Secret Phrase" />
						) : null}
					</>
				) : (
					<>
						<Text weight="extraBold" type="h2" center marginBottom={24}>
							Your Wallet is not Backed Up!
						</Text>
						<Text weight="medium" center marginBottom={40}>
							Your keys your coin. Backup your wallet incase of loss.
						</Text>
						<Button title="Back up to iCloud Keychain" onPress={backupOnKeychain} iconRight="cloudStroke" />
					</>
				)}
			</View>
		</WelcomeLayout>
	);
};

export default BackupSettingsScreen;
