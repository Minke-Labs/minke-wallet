import React, { useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { useState } from '@hookstate/core';
import { useFormProgress, useNavigation } from '@hooks';
import { Keyboard } from 'react-native';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { restoreWalletByMnemonic } from '@src/model/wallet';
import Intercom from '@intercom/intercom-react-native';
import Logger from '@utils/logger';

interface UseImportWalletModalProps {
	onImportFinished: () => void;
	visible: boolean;
	onDismiss: () => void;
}

export const useImportWalletModal = ({ onImportFinished, visible, onDismiss }: UseImportWalletModalProps) => {
	const { currentStep, reset, goForward, goBack } = useFormProgress();
	const navigation = useNavigation();

	const [text, setText] = React.useState('');
	const [importing, setImporting] = React.useState(false);
	const state = useState(globalWalletState());

	const onImportWallet = async () => {
		if (text.trim()) {
			Keyboard.dismiss();
			try {
				setImporting(true);
				const wallet = await restoreWalletByMnemonic(text.trim());
				state.set(await walletState(wallet));
				setImporting(false);
				onImportFinished();

				// Register user on Intercom
				Intercom.registerIdentifiedUser({ userId: wallet.address });
			} catch (error) {
				setImporting(false);
				Logger.error('Invalid seed phrase or primary key');
				captureException(error);
			}
		}
	};

	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
	};

	const onBack = () => {
		if (currentStep === 0) {
			onDismiss();
		} else {
			goBack();
		}
	};

	useEffect(() => {
		if (!visible) {
			reset();
		}
	}, [visible]);

	return {
		text,
		setText,
		importing,
		onImportWallet,
		onBack,
		currentStep,
		goForward,
		onICloudBackup
	};
};
