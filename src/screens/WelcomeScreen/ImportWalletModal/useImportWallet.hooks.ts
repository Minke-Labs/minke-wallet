import React from 'react';
import { useState } from '@hookstate/core';
import { Keyboard } from 'react-native';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { restoreWalletByMnemonic } from '@src/model/wallet';

export const useImportWalletModal = ({ onImportFinished }: { onImportFinished: () => void; }) => {
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
				console.error('Invalid seed phrase or primary key');
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
