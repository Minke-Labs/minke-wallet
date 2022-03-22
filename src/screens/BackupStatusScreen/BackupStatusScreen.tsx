import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Button, Text, Icon, ScreenLoadingIndicator } from '@components';
import { smallWalletAddress, getSeedPhrase, MinkeWallet } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import { backupImg } from '@images';
import { useNavigation, iCloudBackup, useWallets } from '@hooks';
import styles from './BackupStatusScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';

type Props = NativeStackScreenProps<RootStackParamList, 'BackupStatusScreen'>;
const BackupStatusScreen = ({ route }: Props) => {
	const navigation = useNavigation();
	const { walletId } = route.params;
	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);
	const { handleIcloudBackup } = iCloudBackup();
	const { walletById } = useWallets();

	const wallet: MinkeWallet | null = walletById(walletId);

	if (seed.promised || !wallet) {
		return <ScreenLoadingIndicator />;
	}

	const { address, backedUp } = wallet;

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
				</View>

				<Image source={backupImg} style={styles.image} />

				{backedUp ? (
					<>
						<Text weight="extraBold" type="h2" center marginBottom={24} width={275}>
							Your Wallet is Backed Up!
						</Text>
						<Text type="p" weight="regular" center marginBottom={48}>
							{smallWalletAddress(address, 9)}
						</Text>
						<Text weight="medium" center marginBottom={40}>
							If you lose this device you can recover your encrpyted wallet backup from iCloud.
						</Text>
					</>
				) : (
					<>
						<Text weight="extraBold" type="h2" center marginBottom={24} width={275} color="alert1">
							Your Wallet is not Backed Up!
						</Text>
						<Text type="p" weight="regular" center marginBottom={48}>
							{smallWalletAddress(address, 9)}
						</Text>
						<Text weight="medium" center marginBottom={40}>
							Your keys your coin. Backup your wallet incase of loss.
						</Text>
						<Button
							title="Back up to iCloud"
							onPress={handleIcloudBackup}
							iconRight="cloudStroke"
							marginBottom={24}
						/>
					</>
				)}
				{seed.value && (
					<Button
						onPress={() => navigation.navigate('BackupScreen')}
						title="View Secret Phrase"
						mode="outlined"
					/>
				)}
			</View>
		</BasicLayout>
	);
};

export default BackupStatusScreen;
