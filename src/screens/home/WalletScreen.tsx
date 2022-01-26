import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import { useState } from '@hookstate/core';
import { globalWalletState, walletState, emptyWallet } from '@stores/WalletStore';
import { walletCreate, walletDelete, getTransactions, getTokenList, getAllWallets } from '@models/wallet';
import { useFocusEffect } from '@react-navigation/native';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';
import styles from './styles';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();

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
		state.merge({ transactions: result });
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
		if (!loading && lastTransactionsFetch && new Date().getTime() - lastTransactionsFetch > 10000) {
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
	const onSend = () => navigation.navigate('TransactionSelectFunds');
	const onSwitchAccounts = () => navigation.navigate('Accounts');

	const { address, balance } = state.value;
	return (
		<Container>
			<Header onSettingsPress={onSettingsPress} />
			<SafeAreaView>
				<ScrollView
					style={styles.homeScroll}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} />}
				>
					<AssetsPanel onSend={onSend} balance={balance?.usd || ''} address={address} />
					<ActionsPanel
						onCreateWallet={onCreateWallet}
						onDeleteWallet={onDeleteWallet}
						onExchange={onExchange}
						onSwitchAccounts={onSwitchAccounts}
					/>
					<FinancePanel loading={loading} />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
