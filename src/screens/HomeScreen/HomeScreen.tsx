import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';

import { AppTour, FloatingSelector, PendingTransaction, View } from '@components';
import { useAmplitude, useBalances, useGlobalWalletState, useTransactions } from '@hooks';
import { BasicLayout } from '@layouts';
import { networks } from '@models/network';
import { getProvider, ZapperTransaction } from '@src/model/wallet';

import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';
import { MintNFT } from './MintNFT/MintNFT';
import { Stories } from './Stories/Stories';

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
			const pending = pendingTransactions.filter((t) => t.pending)[0];
			if (pending) {
				setTx(pending);
				const nw = Object.values(networks).find((n) => n.chainId === pending.chainId);
				const provider = getProvider(nw.id);
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
						<MintNFT />
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
