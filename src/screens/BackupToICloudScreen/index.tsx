import React, { useCallback, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Modal, ModalReusables } from '@components';
import { RootStackParamList } from '@src/routes/types.routes';
import CreateBackupPassword from './CreateBackupPassword/CreateBackupPassword';
import ConfirmBackupPassword from './ConfirmBackupPassword/ConfirmBackupPassword';

type Props = NativeStackScreenProps<RootStackParamList, 'BackupToICloudScreen'>;
const BackupToICloudScreen = ({ route }: Props) => {
	const { missingPassword, walletId } = route.params;
	const [error, setError] = useState<string | undefined>();

	const onError = useCallback(
		(message: string) => {
			setError(message);
		},
		[walletId]
	);

	return (
		<>
			{missingPassword ? (
				<CreateBackupPassword walletId={walletId} onError={onError} />
			) : (
				<ConfirmBackupPassword walletId={walletId} onError={onError} />
			)}
			<Modal isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error onDismiss={() => setError(undefined)} title="Backup error" description={error} />
			</Modal>
		</>
	);
};

export default BackupToICloudScreen;
