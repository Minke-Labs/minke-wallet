import React, { useEffect } from 'react';
import { useAmplitude, useNavigation, useWalletState } from '@hooks';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { ResultProps } from './WalletScreen.types';

export const useWalletScreen = () => {
	const { track } = useAmplitude();
	const { state } = useWalletState();
	const [error, setError] = React.useState(false);
	const [sendModalOpen, setSendModalOpen] = React.useState(false);
	const navigation = useNavigation();

	const [receiveVisible, setReceiveVisible] = React.useState(false);
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const [sendModalFinished, setSendModalFinished] = React.useState(false);
	const [openAvatarModal, setOpenAvatarModal] = React.useState(false);
	const [sentTransaction, setSentTransaction] = React.useState<ResultProps>();

	const onExchange = () => navigation.navigate('ExchangeScreen');
	const onSettingsPress = () => navigation.navigate('SettingsScreen');
	const onSwitchAccounts = () => navigation.navigate('AccountsScreen');
	const onSeeAllTransactions = () => navigation.navigate('TransactionsScreen');
	const onPointsPress = () => navigation.navigate('ReferralScreen');

	const hideReceive = () => setReceiveVisible(false);
	const showReceive = () => setReceiveVisible(true);

	const { address, balance } = state.value;

	const onCopyToClipboard = () => {
		Clipboard.setString(address || '');
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};

	const onSendFinished = (obj: ResultProps) => {
		const { hash } = obj;
		setSendModalFinished(!hash);
		setSentTransaction(obj);
	};

	useEffect(() => {
		track('Wallet Screen Opened');
		track('Wallet access', { active: (balance?.usd || 0) > 0, address });
	}, []);

	const onError = () => {
		setSendModalFinished(false);
		setError(true);
		setSendModalOpen(true);
	};

	return {
		sendModalOpen,
		setSendModalOpen,
		receiveVisible,
		snackbarVisible,
		setSnackbarVisible,
		sendModalFinished,
		setSendModalFinished,
		sentTransaction,
		onExchange,
		onSettingsPress,
		onSwitchAccounts,
		onSeeAllTransactions,
		hideReceive,
		showReceive,
		onCopyToClipboard,
		onSendFinished,
		setOpenAvatarModal,
		openAvatarModal,
		address,
		balance,
		onError,
		setError,
		error,
		onPointsPress
	};
};
