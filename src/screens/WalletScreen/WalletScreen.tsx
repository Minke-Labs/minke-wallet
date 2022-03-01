/* eslint-disable no-console */
import React, { useCallback, useEffect } from 'react';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabLayout } from '@layouts';
import { useState } from '@hookstate/core';
import { Text, Modal } from '@components';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import { globalWalletState, walletState, emptyWallet } from '@stores/WalletStore';
import { walletCreate, walletDelete, getTransactions, getTokenList, getAllWallets } from '@models/wallet';
// import { AddFunds } from '@containers';
import Header from './Header';
import ReceiveModal from './ReceiveModal';
import AssetsPanel from './AssetsPanel';
import ActionsPanel from './ActionsPanel';
import { RootStackParamList } from '../../routes/types.routes';
import Transactions from './Transactions/Transactions';
import NetWorth from './NetWorth/NetWorth';
import SendModal from './SendModal/SendModal';
import SentModal from './SentModal';
import ComingSoonModal from './ComingSoonModal';

type ResultProps = {
	link: string;
	symbol: string;
};

const WalletScreen = () => {
	const wallet = globalWalletState();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [sendModalOpen, setSendModalOpen] = React.useState(false);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
						navigation.navigate('Welcome');
					}
				}
			}
		]);

	const fetchTransactions = async () => {
		setLoading(true);
		const result = await getTransactions(state.value.address || '');
		state.transactions.set(result);
		setLoading(false);
		setLastTransationsFetch(new Date().getTime());
	};

	const fetchTokenList = async () => {
		if (state.allTokens.length === 0) {
			const result = await getTokenList();
			state.allTokens.set(result);
		}
	};

	useEffect(() => {
		fetchTransactions();
		fetchTokenList();
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
		navigation.navigate('WalletCreated');
	}, [navigation]);

	const onExchange = () => navigation.navigate('Exchange');
	const onSettingsPress = () => navigation.navigate('Settings');
	// const onSend = () => navigation.navigate('TransactionSelectFunds');
	const onSwitchAccounts = () => navigation.navigate('Accounts');
	const onSeeAllTransactions = () => navigation.navigate('Transactions');

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

	return (
		<>
			<TabLayout
				leftTitle="Transactions"
				rightTitle="Net worth"
				left={
					<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />
				}
				right={<NetWorth />}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} />}
				>
					<Header onSettingsPress={onSettingsPress} />
					<AssetsPanel
						onSave={() => navigation.navigate('Save')}
						onWalletAssets={() => navigation.navigate('WalletAssets')}
						onAddFunds={() => setAddFundsVisible(true)}
						balance={balance?.usd || ''}
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
				<Text style={{ color: '#FFFFFF' }}>Address copied!</Text>
			</Snackbar>

			<Modal isVisible={receiveVisible} onDismiss={hideReceive}>
				<ReceiveModal onDismiss={hideReceive} />
			</Modal>

			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				{/* <AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} /> */}
				<ComingSoonModal onDismiss={() => setAddFundsVisible(false)} />
			</Modal>

			<Modal isVisible={sendModalOpen} onDismiss={() => setSendModalOpen(false)}>
				<SendModal
					onDismiss={() => setSendModalOpen(false)}
					sentSuccessfully={(obj: ResultProps) => onSendFinished(obj)}
				/>
			</Modal>

			<Modal isVisible={sendModalFinished} onDismiss={() => setSendModalFinished(false)}>
				<SentModal sentObj={sentObj} onDismiss={() => setSendModalFinished(false)} />
			</Modal>
		</>
	);
};

export default WalletScreen;
