import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { View, FloatingSelector, PendingTransaction, AppTour } from '@components';
import { useAmplitude, useTransactions, useGlobalWalletState, useBalances } from '@hooks';
import { getProvider, ZapperTransaction } from '@src/model/wallet';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';

const HomeScreen = () => {
	RNUxcam.tagScreenName('HomeScreen');
	const {
		// loading,
		fetchTransactions,
		pendingTransactions,
		updatePendingTransaction
	} = useTransactions();
	const [tx, setTx] = useState<ZapperTransaction | null>();

	useEffect(() => {
		const fetchStatus = async () => {
			const provider = await getProvider();
			const pending = pendingTransactions.filter((t) => t.pending)[0];
			if (pending) {
				setTx(pending);
				const { status } = await provider.waitForTransaction(pending.hash);
				const newTransaction = { ...pending, pending: false, txSuccessful: status === 1 };
				setTx(newTransaction);
				updatePendingTransaction(pending.hash, newTransaction);
			}
		};

		fetchStatus();
	}, [pendingTransactions]);

	const handleRefresh = useCallback(() => {
		fetchTransactions();
		setTx(null);
	}, [fetchTransactions]);

	const { track } = useAmplitude();

	const { address } = useGlobalWalletState();
	const { balance } = useBalances();

	useEffect(() => {
		track('Home Screen Opened');
		track('Wallet access', { active: balance > 0, address });
	}, []);

	return (
		<AppTour>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView
					refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
					showsVerticalScrollIndicator={false}
				>
					<View ph="xs">
						<Header />
						{!!tx && <PendingTransaction transaction={tx} />}
						<Assets />
						<Accounts />
						<Stories />
						<View mb="xxxl" />
						<View mb="m" />
					</View>
				</ScrollView>
				<FloatingSelector />
			</BasicLayout>
		</AppTour>
	);
};

export default HomeScreen;
