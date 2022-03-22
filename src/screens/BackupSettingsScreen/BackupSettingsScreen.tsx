import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Button, Text, Icon, ScreenLoadingIndicator } from '@components';
import { smallWalletAddress, getSeedPhrase } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import { backupImg } from '@images';
import { useNavigation, iCloudBackup } from '@hooks';
import styles from './BackupSettingsScreen.styles';

const BackupSettingsScreen = () => {
	const navigation = useNavigation();
	const state = useState(globalWalletState());
	const { address, walletId, backedUp } = state.value;
	const wallet = smallWalletAddress(address);

	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);
	const { handleIcloudBackup } = iCloudBackup();

	if (seed.promised) return <ScreenLoadingIndicator />;

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('WalletScreen')}>
					<Text weight="medium" color="text7" type="a">
						Done
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.padding}>
				<View style={{ width: '100%', marginBottom: 32 }}>
					<Text weight="extraBold" type="h3">
						Backup
					</Text>
					<Text>{wallet}</Text>
				</View>

				<Image source={backupImg} style={styles.image} />

				{backedUp ? (
					<>
						<Text weight="extraBold" type="h2" center marginBottom={24}>
							Your Wallet is Backed Up!
						</Text>
						<Text weight="medium" center marginBottom={40}>
							If you lose this device you can recover your encrpyted wallet backup from iCloud. Remember
							to activate the iCloud Keychain backup
						</Text>
						{seed.value && (
							<Button onPress={() => navigation.navigate('BackupScreen')} title="View Secret Phrase" />
						)}
					</>
				) : (
					<>
						<Text weight="extraBold" type="h2" center marginBottom={24}>
							Your Wallet is not Backed Up!
						</Text>
						<Text weight="medium" center marginBottom={40}>
							Your keys your coin. Backup your wallet incase of loss.
						</Text>
						<Button title="Back up to iCloud" onPress={handleIcloudBackup} iconRight="cloudStroke" />
					</>
				)}
			</View>
		</BasicLayout>
	);
};

export default BackupSettingsScreen;
