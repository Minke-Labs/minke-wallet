import React from 'react';
import { captureException } from '@sentry/react-native';
import { useState } from '@hookstate/core';
import { Keyboard } from 'react-native';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { restoreWalletByMnemonic } from '@src/model/wallet';
import Logger from '@utils/logger';

interface UseImportWalletModalProps {
	onImportFinished: () => void;
}

export const useImportWallet = ({ onImportFinished }: UseImportWalletModalProps) => {
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
			} catch (error) {
				setImporting(false);
				Logger.error('Invalid seed phrase or primary key');
				captureException(error);
			}
		}
	};

	return {
		text,
		setText,
		importing,
		onImportWallet
	};
};
