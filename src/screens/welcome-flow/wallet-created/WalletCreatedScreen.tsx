import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import PrimaryButton from '@components/PrimaryButton';
import * as SecureStore from 'expo-secure-store';
import { Entypo } from '@expo/vector-icons';
import { globalWalletState } from '@stores/WalletStore';
import { getSeedPhrase } from '@models/wallet';
import { RootStackParamList } from '@helpers/param-list-type';
import WelcomeContainer from '../WelcomeContainer';
import MainText from '../MainText';
import SecondaryText from '../SecondaryText';
import styles from './styles';
import logo from './wallet-created.png';

export function WalletCreatedScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const backupManually = useCallback(async () => {
		navigation.navigate('Backup');
	}, [navigation]);
	const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;

	const keyChainOptions = {
		requireAuthentication: true,
		keychainService: 'minke',
		keychainAccessible: SecureStore.WHEN_UNLOCKED
	};

	const backupOnKeychain = async () => {
		const seedValue = seed.value;
		const key = `minke_wallet_${walletState.value.walletId || ''}`;

		if (seedValue) {
			await SecureStore.setItemAsync(key, seedValue, keyChainOptions);
			const savedValue = await SecureStore.getItemAsync(key, {
				keychainService: 'minke',
				keychainAccessible: SecureStore.WHEN_UNLOCKED
			});

			if (seedValue === savedValue) {
				onFinish();
			} else {
				backupManually();
			}
		} else {
			backupManually();
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
