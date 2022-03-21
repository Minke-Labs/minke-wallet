import React, { useCallback } from 'react';
import { Button, Icon, Input, Text } from '@components';
import { WelcomeLayout } from '@layouts';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation, useWalletCloudBackup } from '@hooks';
import { backupImg } from '@images';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import styles from './CreateBackupPassword.styles';

const CreateBackupPassword = () => {
	const navigation = useNavigation();
	const [password, setPassword] = React.useState<string>();
	const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>();
	const walletCloudBackup = useWalletCloudBackup();
	const { walletId } = useState(globalWalletState()).value;

	const isPasswordValid =
		password && passwordConfirmation && password === passwordConfirmation && password.length >= 8;

	const onError = (message: any) => {
		console.error(message);
	};

	const onSuccess = async () => {
		navigation.goBack();
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

	return (
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.padding}>
				<Image source={backupImg} style={styles.image} />
			</View>
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
		</WelcomeLayout>
	);
};

export default CreateBackupPassword;
