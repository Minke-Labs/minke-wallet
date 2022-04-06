import React from 'react';
import { Alert } from 'react-native';
import { useState } from '@hookstate/core';
import { useNavigation } from '@hooks';
import * as Clipboard from 'expo-clipboard';
import { globalWalletState, walletState, emptyWallet } from '@stores/WalletStore';
import { walletDelete, getAllWallets } from '@models/wallet';
import { ResultProps } from './WalletScreen.types';

export const useWalletScreen = () => {
	const state = useState(globalWalletState());
	const [sendModalOpen, setSendModalOpen] = React.useState(false);
	const navigation = useNavigation();

	const [receiveVisible, setReceiveVisible] = React.useState(false);
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const [sendModalFinished, setSendModalFinished] = React.useState(false);
	const [sentObj, setSendObj] = React.useState<ResultProps>();

	const onDeleteWallet = () =>
		Alert.alert('Are you sure?', '', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: async () => {
					await walletDelete(state.value?.walletId || '');
					const allWallets = (await getAllWallets()) || {};
					const wallets = Object.values(allWallets);

					if (wallets.length > 0) {
						state.set(await walletState(wallets[0]));
					} else {
						state.set(emptyWallet);
						navigation.navigate('WelcomeScreen');
					}
				}
			}
		]);

	const onExchange = () => navigation.navigate('ExchangeScreen');
	const onSettingsPress = () => navigation.navigate('SettingsScreen');
	const onSwitchAccounts = () => navigation.navigate('AccountsScreen');
	const onSeeAllTransactions = () => navigation.navigate('TransactionsScreen');

	const hideReceive = () => setReceiveVisible(false);
	const showReceive = () => setReceiveVisible(true);

	const { address, balance } = state.value;

	const onCopyToClipboard = () => {
		Clipboard.setString(address || '');
		setSnackbarVisible(true);
	};

	const onSendFinished = (obj: ResultProps) => {
		setSendModalFinished(true);
		setSendObj(obj);
	};

	return {
		sendModalOpen,
		setSendModalOpen,
		receiveVisible,
		addFundsVisible,
		setAddFundsVisible,
		snackbarVisible,
		setSnackbarVisible,
		sendModalFinished,
		setSendModalFinished,
		sentObj,
		onDeleteWallet,
		onExchange,
		onSettingsPress,
		onSwitchAccounts,
		onSeeAllTransactions,
		hideReceive,
		showReceive,
		onCopyToClipboard,
		onSendFinished,
		address,
		balance
	};
};
