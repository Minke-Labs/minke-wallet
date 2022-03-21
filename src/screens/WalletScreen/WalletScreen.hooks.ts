import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from '@hookstate/core';
import { useNavigation } from '@hooks';
import * as Clipboard from 'expo-clipboard';
import { globalWalletState, walletState, emptyWallet, fetchTokensAndBalances } from '@stores/WalletStore';
import { walletCreate, walletDelete, getTransactions, getAllWallets } from '@models/wallet';
import { ResultProps } from './WalletScreen.types';

export const useWalletScreen = () => {
	const wallet = globalWalletState();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [sendModalOpen, setSendModalOpen] = React.useState(false);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const navigation = useNavigation();

	const [receiveVisible, setReceiveVisible] = React.useState(false);
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const [sendModalFinished, setSendModalFinished] = React.useState(false);
	const [sentObj, setSendObj] = React.useState<ResultProps>();
	// const [comingSoonVisible, setComingSoonVisible] = React.useState(false);

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

	const fetchTransactions = async () => {
		setLoading(true);
		const { address, privateKey } = state.value;
		const transactions = await getTransactions(address || '');
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions, balance });
		setLoading(false);
		setLastTransationsFetch(new Date().getTime());
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

	useFocusEffect(() => {
		if (
			!loading &&
			((lastTransactionsFetch && new Date().getTime() - lastTransactionsFetch > 10000) ||
				state.transactions.value === undefined)
		) {
			fetchTransactions();
		}
	});

	const onCreateWallet = useCallback(async () => {
		const newWallet = await walletCreate();
		state.set(await walletState(newWallet));
		navigation.navigate('WalletCreatedScreen');
	}, [navigation]);

	const onExchange = () => navigation.navigate('ExchangeScreen');
	const onSettingsPress = () => navigation.navigate('SettingsScreen');
	const onSwitchAccounts = () => navigation.navigate('AccountsScreen');
	const onSeeAllTransactions = () => navigation.navigate('TransactionsScreen');

	const hideReceive = () => setReceiveVisible(false);
	const showReceive = () => setReceiveVisible(true);
	const onCopyToClipboard = () => {
		Clipboard.setString(wallet.value.address || '');
		setSnackbarVisible(true);
	};

	const onSendFinished = (obj: ResultProps) => {
		setSendModalFinished(true);
		setSendObj(obj);
	};

	const { address, balance } = state.value;

	return {
		loading,
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
		onCreateWallet,
		onExchange,
		onSettingsPress,
		onSwitchAccounts,
		onSeeAllTransactions,
		hideReceive,
		showReceive,
		onCopyToClipboard,
		onSendFinished,
		address,
		balance,
		fetchTransactions
	};
};
