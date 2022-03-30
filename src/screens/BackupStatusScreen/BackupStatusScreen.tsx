import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Button, Text, Icon, ScreenLoadingIndicator, LoadingScreen, ModalReusables, Modal } from '@components';
import { smallWalletAddress, getSeedPhrase, MinkeWallet } from '@models/wallet';
import { backupImg } from '@images';
import { useNavigation, iCloudBackup, useWallets } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { walletState, globalWalletState } from '@src/stores/WalletStore';

import styles from './BackupStatusScreen.styles';

const BackedUp: React.FC<{ address: string }> = ({ address }) => (
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
);

const NotBackedUp: React.FC<{ handleIcloudBackup: () => void; address: string }> = ({
	address,
	handleIcloudBackup
}) => (
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
		<Button title="Back up to iCloud" onPress={handleIcloudBackup} iconRight="cloudStroke" marginBottom={24} />
	</>
);

type Props = NativeStackScreenProps<RootStackParamList, 'BackupStatusScreen'>;
const BackupStatusScreen = ({ route }: Props) => {
	const state = useState(globalWalletState());
	const { address: addressState } = state.value;

	const navigation = useNavigation();
	const { walletId, finishedBackup } = route.params;
	const [error, setError] = React.useState<string | undefined>();

	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);
	const { wallets } = useWallets();

	const wallet: MinkeWallet = wallets[walletId];

	const { handleIcloudBackup, isWalletLoading, backupError } = iCloudBackup(walletId);

	useEffect(() => {
		setError(backupError);
	}, [backupError]);

	if (seed.promised || !wallet) {
		return <ScreenLoadingIndicator />;
	}

	const { address, backedUp } = wallet;

	if (isWalletLoading) {
		return <LoadingScreen title={isWalletLoading} />;
	}

	const onSelectWallet = async (walletIn: MinkeWallet) => {
		state.set(await walletState(walletIn));
		navigation.navigate('WalletScreen');
	};

	return (
		<>
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

					{finishedBackup || backedUp ? (
						<BackedUp {...{ address }} />
					) : (
						<NotBackedUp {...{ address, handleIcloudBackup }} />
					)}
					{address !== addressState && (
						<Button title="Go to Wallet" marginBottom={21} onPress={() => onSelectWallet(wallet)} />
					)}
					{seed.value && (
						<Button
							onPress={() => navigation.navigate('ManualBackupScreen', { walletId })}
							title="View Secret Phrase"
							mode="outlined"
						/>
					)}
				</View>
			</BasicLayout>

			<Modal isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error onDismiss={() => setError(undefined)} title="Backup error" description={error} />
			</Modal>
		</>
	);
};

export default BackupStatusScreen;
