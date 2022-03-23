import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import CreateBackupPassword from './CreateBackupPassword/CreateBackupPassword';
import ConfirmBackupPassword from './ConfirmBackupPassword/ConfirmBackupPassword';

type Props = NativeStackScreenProps<RootStackParamList, 'BackupToICloudScreen'>;
const BackupToICloudScreen = ({ route }: Props) => {
	const { missingPassword, walletId } = route.params;

	if (missingPassword) {
		return <CreateBackupPassword walletId={walletId} />;
	}

	return <ConfirmBackupPassword walletId={walletId} />;
};

export default BackupToICloudScreen;
