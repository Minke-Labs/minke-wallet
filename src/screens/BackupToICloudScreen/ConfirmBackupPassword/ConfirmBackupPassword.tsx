import React, { useCallback } from 'react';
import { Button, Icon, Input, Text } from '@components';
import { WelcomeLayout } from '@layouts';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation, useWalletCloudBackup } from '@hooks';
import { backupImg } from '@images';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import styles from './ConfirmBackupPassword.styles';

const CreateBackupPassword = () => {
	const navigation = useNavigation();
	const [password, setPassword] = React.useState<string>();
	const walletCloudBackup = useWalletCloudBackup();
	const { walletId } = useState(globalWalletState()).value;

	const isPasswordValid = password && password.length >= 8;

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
					Enter backup password
				</Text>
				<Text type="p2" weight="medium" color="text2" marginBottom={32}>
					To add this wallet to your iCloud backup, enter your existing backup password
				</Text>

				<Input
					label="Enter password"
					isPassword
					value={password}
					onChangeText={(t) => setPassword(t)}
					autoCompleteType="off"
					error={password !== undefined && (!password || password.length < 8)}
					style={{ marginBottom: 32 }}
				/>

				<Button
					title="Confirm backup"
					iconRight="cloudStroke"
					disabled={!isPasswordValid}
					onPress={onConfirmBackup}
				/>
			</View>
		</WelcomeLayout>
	);
};

export default CreateBackupPassword;
