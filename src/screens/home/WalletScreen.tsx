import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { walletDelete, getTransactions, getTokenList } from '@models/wallet';
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
		state.set({ wallet: null, walletId: null, transactions: [], allTokens: [] });
		navigation.navigate('Welcome');
	}, [navigation]);

	const onExchange = () => {
		navigation.navigate('Exchange');
	};

	const fetchTransactions = async () => {
		setLoading(true);
		const result = await getTransactions(state.value.wallet?.address || '');
		state.transactions.set(result);
		setLoading(false);
		setLastTransationsFetch(new Date().getTime());
	};

	const fetchTokenList = async () => {
		const result = await getTokenList();
		state.allTokens.set(result);
	};

	useEffect(() => {
		fetchTransactions();
		fetchTokenList();
	}, []);

	useFocusEffect(() => {
		if (lastTransactionsFetch && new Date().getTime() - lastTransactionsFetch > 10000) {
			fetchTransactions();
		}
	});

	return (
		<Container>
			<Header />
			<SafeAreaView>
				<ScrollView
					style={styles.homeScroll}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} />}
				>
					<AssetsPanel />
					<ActionsPanel onDeleteWallet={onDeleteWallet} onExchange={onExchange} />
					<FinancePanel loading={loading} />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
