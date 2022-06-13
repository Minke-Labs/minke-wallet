import React, { useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { useState } from '@hookstate/core';
import { useFormProgress, useNavigation } from '@hooks';
import { Keyboard } from 'react-native';
import crypto from 'crypto';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { restoreWalletByMnemonic } from '@src/model/wallet';
import Intercom from '@intercom/intercom-react-native';
import Logger from '@utils/logger';
import { INTERCOM_KEY } from '@env';

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
				const intercomKey = INTERCOM_KEY || process.env.INTERCOM_KEY;
				const hmac = crypto.createHmac('sha256', intercomKey!);
				hmac.update(wallet.address);
				const sign = hmac.digest('hex');
				Intercom.setUserHash(sign);
				Intercom.registerIdentifiedUser({ userId: wallet.address });
				//
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
