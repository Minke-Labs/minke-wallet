import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import PrimaryButton from 'old/src/components/PrimaryButton';
import { Entypo } from '@expo/vector-icons';
import { globalWalletState } from 'old/src/stores/WalletStore';
import { getSeedPhrase } from '@src/model/wallet';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import logo from '@assets/wallet-created.png';
import { backupSeedOnKeychain } from '@src/model/keychain';
import WelcomeContainer from '../WelcomeContainer';
import MainText from '../MainText';
import SecondaryText from '../SecondaryText';
import styles from './styles';

export function WalletCreatedScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const backupManually = useCallback(async () => {
		navigation.navigate('Backup');
	}, [navigation]);
	const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

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
		<WelcomeContainer>
			<View style={styles.heroImageContainer}>
				<Image source={logo} style={styles.heroImage} />
			</View>
			<View style={styles.content}>
				<MainText>Wallet created!</MainText>
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
				<PrimaryButton onPress={backupManually} mode="text">
					Back up manually
				</PrimaryButton>
			</View>
		</WelcomeContainer>
	);
}
