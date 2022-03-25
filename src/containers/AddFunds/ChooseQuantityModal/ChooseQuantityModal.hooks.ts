import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import * as Clipboard from 'expo-clipboard';
import { globalWalletState } from '@stores/WalletStore';
import { ICoin } from '@helpers/coins';

const DEFAULT_VALUE = 100;

interface UseChooseQuantityModalProps {
	coin: ICoin;
	setPresetAmount: Function;
}

export const useChooseQuantityModal = ({ coin, setPresetAmount }: UseChooseQuantityModalProps) => {
	const { name, symbol } = coin;
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const { address } = useState(globalWalletState()).value;

	const onCopyToClipboard = () => {
		Clipboard.setString(address || '');
		setSnackbarVisible(true);
	};

	useEffect(() => {
		setPresetAmount(DEFAULT_VALUE);
	}, []);

	return {
		name,
		symbol,
		onCopyToClipboard,
		snackbarVisible,
		setSnackbarVisible
	};
};
