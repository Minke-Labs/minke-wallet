/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabLayout } from '@layouts';
import { View, RefreshControl, ScrollView } from 'react-native';
import { Text } from '@components';
import { useState } from '@hookstate/core';
import { globalWalletState, walletState, emptyWallet } from '@stores/WalletStore';
import { walletCreate, walletDelete, getTransactions, getTokenList, getAllWallets } from '@models/wallet';
import Header from './Header';
import AssetsPanel from './AssetsPanel';
import ActionsPanel from './ActionsPanel';
import { RootStackParamList } from '../../routes/types.routes';
import Transactions from './Transactions/Transactions';
import NetWorth from './NetWorth/NetWorth';

const WalletScreen = () => {
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		const allWallets = (await getAllWallets()) || {};
		const wallets = Object.values(allWallets);

		if (wallets.length > 0) {
			state.set(await walletState(wallets[0]));
		} else {
			state.set(emptyWallet);
			navigation.navigate('Welcome');
		}
	}, [navigation]);

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
		state.set(newWallet as any);
		navigation.navigate('WalletCreated');
	}, [navigation]);

	const onExchange = () => navigation.navigate('Exchange');
	const onSettingsPress = () => navigation.navigate('Settings');
	// const onSend = () => navigation.navigate('TransactionSelectFunds');
	const onSwitchAccounts = () => navigation.navigate('Accounts');
	const onSeeAllTransactions = () => navigation.navigate('Transactions');

	const { address, balance } = state.value;

	return (
		<TabLayout
			leftTitle="Transactions"
			rightTitle="Net worth"
			left={<Transactions {...{ onSeeAllTransactions, loading }} />}
			right={<NetWorth />}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} />}
			>
				<Header onSettingsPress={onSettingsPress} />
				<AssetsPanel balance={balance?.usd || ''} address={address} />
				<ActionsPanel
					onCreateWallet={onCreateWallet}
					onDeleteWallet={onDeleteWallet}
					onExchange={onExchange}
					onSwitchAccounts={onSwitchAccounts}
				/>
			</ScrollView>
		</TabLayout>
	);
};

export default WalletScreen;
