import React, { useCallback } from 'react';
import { Button, Icon, Input, LoadingScreen, Text } from '@components';
import { BasicLayout } from '@layouts';
import { Image, TouchableOpacity, View } from 'react-native';
import { useKeyboard, useNavigation, useWalletCloudBackup, useLanguage, useCountry } from '@hooks';
import { backupImg } from '@images';
import { restoreCloudBackup } from '@models/backup';
import { useState } from '@hookstate/core';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { getAllWallets } from '@models/wallet';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import { BackupToICloudProps } from '../BackupToICloudScreen.types';
import styles from './ConfirmBackupPassword.styles';

const ConfirmBackupPassword = ({ walletId, onError, restoreBackups = false }: BackupToICloudProps) => {
	const { country } = useCountry();
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const [password, setPassword] = React.useState<string>();
	const { isWalletLoading, walletCloudBackup } = useWalletCloudBackup();
	const [restoringBackuups, setRestoringBackups] = React.useState<string | null>();
	const keyboardVisible = useKeyboard();
	const state = useState(globalWalletState());
	const { address } = state.value;

	const isPasswordValid = password && password.length >= 8;

	const onSuccess = async () => {
		navigation.navigate('BackupStatusScreen', { walletId: walletId || '', finishedBackup: true });
	};

	const onConfirm = useCallback(async () => {
		if (!isPasswordValid) return;
		if (restoreBackups) {
			setRestoringBackups(i18n.t('BackupToICloudScreen.ConfirmBackupPassword.importing_backups'));
			const success = await restoreCloudBackup(password);
			setRestoringBackups(null);
			if (success) {
				const allWallets = (await getAllWallets()) || {};
				const wallets = Object.values(allWallets);

				if (!address && wallets.length > 0) {
					state.set(await walletState(wallets[0]));
				}

				if (country) navigation.navigate('WalletScreen');
				else navigation.navigate('CountryScreen');
			} else {
				onError(i18n.t('Logs.couldnt_restore_backup'));
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
	}, [onError, onSuccess, password, walletCloudBackup, walletId, restoreBackups, address]);

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
					{i18n.t('Logs.couldnt_restore_backup')}
				</Text>
				<Text type="p2" weight="medium" color="text2" marginBottom={32}>
					{i18n.t('BackupToICloudScreen.ConfirmBackupPassword.to')}
					{restoreBackups
						? i18n.t('BackupToICloudScreen.ConfirmBackupPassword.restore_from')
						: i18n.t('BackupToICloudScreen.ConfirmBackupPassword.add_to')}
					{i18n.t('BackupToICloudScreen.ConfirmBackupPassword.enter_existing', { cloudPlatform })}
				</Text>

				<Input
					label={i18n.t('Components.Inputs.enter_password')}
					isPassword
					value={password}
					onChangeText={(t) => setPassword(t)}
					autoCompleteType="off"
					error={password !== undefined && (!password || password.length < 8)}
					style={{ marginBottom: 32 }}
					textContentType="password"
				/>

				<Button
					title={
						restoreBackups
							? i18n.t('Components.Buttons.confirm_restore')
							: i18n.t('Components.Buttons.confirm_backup')
					}
					iconRight="cloudStroke"
					disabled={!isPasswordValid}
					onPress={onConfirm}
				/>
			</View>
		</BasicLayout>
	);
};

export default ConfirmBackupPassword;
