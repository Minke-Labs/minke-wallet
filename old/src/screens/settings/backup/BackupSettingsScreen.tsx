import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import { useState } from '@hookstate/core';
import { Entypo } from '@expo/vector-icons';
import Container from 'old/src/components/Container';
import SecondaryText from 'old/src/screens/welcome-flow/SecondaryText';
import MainText from 'old/src/screens/welcome-flow/MainText';
import PrimaryButton from 'old/src/components/PrimaryButton';
import AppLoading from 'expo-app-loading';
import { searchForMinkeBackups, backupSeedOnKeychain } from 'old/src/model/keychain';
import { smallWalletAddress, getSeedPhrase } from 'old/src/model/wallet';
import globalStyles from 'old/src/components/global.styles';
import { globalWalletState } from 'old/src/stores/WalletStore';
import BackupImage from '@assets/backup.svg';
import styles from './styles';

const BackupSettingsScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
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
		<Container style={styles.container}>
			<View style={globalStyles.padding}>
				<Headline style={globalStyles.headline}>Backup</Headline>
				<SecondaryText>{wallet}</SecondaryText>
				<View style={styles.heroImageContainer}>
					<BackupImage />
				</View>
				{backups.includes(toBackup) ? (
					<>
						<MainText>Your Wallet is Backed Up!</MainText>
						<SecondaryText>
							If you lose this device you can recover your encrpyted wallet backup from iCloud. Remember
							to activate the iCloud Keychain backup
						</SecondaryText>
						{seed.value ? (
							<PrimaryButton onPress={() => navigation.navigate('Backup')} mode="outlined">
								View Secret Phrase
							</PrimaryButton>
						) : null}
					</>
				) : (
					<>
						<MainText>Your Wallet is not Backed Up!</MainText>
						<SecondaryText>Your keys your coin. Backup your wallet incase of loss.</SecondaryText>
						<PrimaryButton
							onPress={backupOnKeychain}
							icon={() => (
								<Entypo
									name="icloud"
									size={24}
									color="white"
									style={[
										{
											transform: [{ scaleX: -1 }]
										}
									]}
								/>
							)}
						>
							Back up to iCloud Keychain
						</PrimaryButton>
					</>
				)}
			</View>
		</Container>
	);
};

export default BackupSettingsScreen;
