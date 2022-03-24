import React, { useState, useCallback } from 'react';
import { Button, Icon, Input, LoadingScreen, Text } from '@components';
import { BasicLayout } from '@layouts';
import { Image, TouchableOpacity, View } from 'react-native';
import { useKeyboard, useNavigation, useWalletCloudBackup } from '@hooks';
import { backupImg } from '@images';
import { restoreCloudBackup } from '@models/backup';
import { BackupToICloudProps } from '../BackupToICloudScreen.types';
import styles from './ConfirmBackupPassword.styles';

const ConfirmBackupPassword = ({ walletId, onError, restoreBackups = false }: BackupToICloudProps) => {
	const navigation = useNavigation();
	const [password, setPassword] = useState<string>();
	const { isWalletLoading, walletCloudBackup } = useWalletCloudBackup();
	const [restoringBackuups, setRestoringBackups] = useState<string | null>();
	const keyboardVisible = useKeyboard();

	const isPasswordValid = password && password.length >= 8;

	const onSuccess = async () => {
		navigation.navigate('BackupStatusScreen', { walletId: walletId || '', finishedBackup: true });
	};

	const onConfirm = useCallback(async () => {
		if (!isPasswordValid) return;
		if (restoreBackups) {
			setRestoringBackups('Importing backups');
			const success = await restoreCloudBackup(password);
			setRestoringBackups(null);

			if (success) {
				navigation.navigate('WalletScreen');
			} else {
				onError('We could not restore your backups');
			}
		} else {
			if (!walletId) return;
			await walletCloudBackup({
				onError,
				onSuccess,
				password,
				walletId
			});
		}
	}, [onError, onSuccess, password, walletCloudBackup, walletId, restoreBackups]);

	if (!!isWalletLoading || !!restoringBackuups) {
		return <LoadingScreen title={isWalletLoading! || restoringBackuups!} />;
	}

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			{!keyboardVisible && (
				<View style={styles.padding}>
					<Image source={backupImg} style={styles.image} />
				</View>
			)}
			<View style={{ paddingHorizontal: 24 }}>
				<Text type="h3" weight="extraBold" marginBottom={8}>
					Enter backup password
				</Text>
				<Text type="p2" weight="medium" color="text2" marginBottom={32}>
					To {restoreBackups ? 'restore your wallets from' : 'add this wallet to'} your iCloud backup, enter
					your existing backup password
				</Text>

				<Input
					label="Enter password"
					isPassword
					value={password}
					onChangeText={(t) => setPassword(t)}
					autoCompleteType="off"
					error={password !== undefined && (!password || password.length < 8)}
					style={{ marginBottom: 32 }}
					textContentType="password"
				/>

				<Button
					title={restoreBackups ? 'Confirm restore' : 'Confirm backup'}
					iconRight="cloudStroke"
					disabled={!isPasswordValid}
					onPress={onConfirm}
				/>
			</View>
		</BasicLayout>
	);
};

export default ConfirmBackupPassword;
