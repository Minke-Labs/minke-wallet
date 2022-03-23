import React, { useCallback } from 'react';
import { Button, Icon, Input, LoadingScreen, Text } from '@components';
import { BasicLayout } from '@layouts';
import { Image, TouchableOpacity, View } from 'react-native';
import { useKeyboard, useNavigation, useWalletCloudBackup } from '@hooks';
import { backupImg } from '@images';
import { saveBackupPassword } from '@models/backup';
import styles from './CreateBackupPassword.styles';

const CreateBackupPassword = ({ walletId }: { walletId: string }) => {
	const navigation = useNavigation();
	const [password, setPassword] = React.useState<string>();
	const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>();
	const { walletCloudBackup, isWalletLoading } = useWalletCloudBackup();

	const keyboardVisible = useKeyboard();

	const isPasswordValid =
		password && passwordConfirmation && password === passwordConfirmation && password.length >= 8;

	const onError = (message: any) => {
		console.error(message);
	};

	const onSuccess = async () => {
		if (password) await saveBackupPassword(password);
		navigation.navigate('BackupStatusScreen', { walletId: walletId || '', finishedBackup: true });
	};

	const onConfirmBackup = useCallback(async () => {
		if (!isPasswordValid || !walletId) return;
		await walletCloudBackup({
			onError,
			onSuccess,
			password,
			walletId
		});
	}, [onError, onSuccess, password, walletCloudBackup, walletId]);

	if (isWalletLoading) {
		return <LoadingScreen title={isWalletLoading} />;
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
					Choose a password
				</Text>
				<Text type="p2" weight="medium" color="text2" marginBottom={32}>
					Please choose a password you’ll remember.{' '}
					<Text type="p2" weight="bold">
						It can’t be recovered!
					</Text>
				</Text>

				<Input
					label="Enter password"
					isPassword
					value={password}
					onChangeText={(t) => setPassword(t)}
					autoCompleteType="off"
					error={password !== undefined && (!password || password.length < 8)}
					style={{ marginBottom: 24 }}
				/>
				<Input
					label="Repeat password"
					isPassword
					value={passwordConfirmation}
					onChangeText={(t) => setPasswordConfirmation(t)}
					autoCompleteType="off"
					error={
						passwordConfirmation !== undefined &&
						(!passwordConfirmation || passwordConfirmation.length < 8 || passwordConfirmation !== password)
					}
					style={{ marginBottom: 32 }}
				/>

				<Button
					title="Back up to iCloud"
					iconRight="cloudStroke"
					disabled={!isPasswordValid}
					onPress={onConfirmBackup}
				/>
			</View>
		</BasicLayout>
	);
};

export default CreateBackupPassword;
