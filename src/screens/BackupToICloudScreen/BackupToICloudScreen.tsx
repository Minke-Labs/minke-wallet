import React, { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModalBase, ModalReusables } from '@components';
import { RootStackParamList } from '@src/routes/types.routes';
import RNUxcam from 'react-native-ux-cam';
import CreateBackupPassword from './CreateBackupPassword/CreateBackupPassword';
import ConfirmBackupPassword from './ConfirmBackupPassword/ConfirmBackupPassword';

type Props = NativeStackScreenProps<RootStackParamList, 'BackupToICloudScreen'>;
const BackupToICloudScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('BackupToICloudScreen');
	const { missingPassword, walletId, restoreBackups = false } = route.params;
	const [error, setError] = useState<string | undefined>();

	const onError = useCallback(
		(message: string) => {
			Keyboard.dismiss();
			setError(message);
		},
		[walletId]
	);

	return (
		<>
			{missingPassword ? (
				<CreateBackupPassword walletId={walletId} onError={onError} />
			) : (
				<ConfirmBackupPassword walletId={walletId} onError={onError} restoreBackups={restoreBackups} />
			)}
			<ModalBase isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error onDismiss={() => setError(undefined)} description={error} />
			</ModalBase>
		</>
	);
};

export default BackupToICloudScreen;
