/* eslint-disable no-console */
import React, { useCallback, useEffect } from 'react';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabLayout } from '@layouts';
import { useState } from '@hookstate/core';
import { Text, Modal } from '@components';
import { useNavigation } from '@hooks';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import { globalWalletState, walletState, emptyWallet, fetchTokensAndBalances } from '@stores/WalletStore';
import { walletCreate, walletDelete, getTransactions, getAllWallets } from '@models/wallet';
import { AssetsPanel, ActionsPanel, Header } from './components';
import { Transactions, Accounts } from './screens';
import { SendModal, ReceiveModal, SentModal } from './Modals';
import { ResultProps } from './WalletScreen.types';
import { AddFunds } from '@containers';

const WalletScreen = () => {
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
		Clipboard.setString(state.address.value || '');
		setSnackbarVisible(true);
	};

	const onSendFinished = (obj: ResultProps) => {
		setSendModalFinished(true);
		setSendObj(obj);
	};

	const { address, balance } = state.value;

	return (
		<>
			<TabLayout
				leftTitle="Transactions"
				rightTitle="Accounts"
				left={
					<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />
				}
				right={<Accounts />}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} />}
				>
					<Header onSettingsPress={onSettingsPress} />
					<AssetsPanel
						onSave={() => navigation.navigate('SaveScreen')}
						onWalletAssets={() => navigation.navigate('WalletAssetsScreen')}
						onAddFunds={() => setAddFundsVisible(true)}
						balance={balance?.usd || 0}
						address={address}
					/>
					<ActionsPanel
						{...{
							onCreateWallet,
							onDeleteWallet,
							onExchange,
							onSwitchAccounts,
							showReceive,
							onCopyToClipboard
						}}
						setSendModalOpen={() => setSendModalOpen(true)}
					/>
				</ScrollView>
			</TabLayout>

			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">Address copied!</Text>
			</Snackbar>

			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</Modal>

			<Modal isVisible={sendModalOpen} onDismiss={() => setSendModalOpen(false)}>
				<SendModal
					onDismiss={() => setSendModalOpen(false)}
					sentSuccessfully={(obj: ResultProps) => onSendFinished(obj)}
					isVisible={sendModalOpen}
				/>
			</Modal>

			<Modal isVisible={receiveVisible} onDismiss={hideReceive}>
				<ReceiveModal onDismiss={hideReceive} />
			</Modal>

			<Modal isVisible={sendModalFinished} onDismiss={() => setSendModalFinished(false)}>
				<SentModal sentObj={sentObj} onDismiss={() => setSendModalFinished(false)} />
			</Modal>
		</>
	);
};

export default WalletScreen;
