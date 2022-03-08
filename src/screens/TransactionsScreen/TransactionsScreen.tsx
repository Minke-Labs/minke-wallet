import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { getTransactions, Transaction as TransactionProps } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import Header from './Header/Header';
import Selector from './Selector/Selector';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import Body from './Body/Body';

const TransactionsScreen = () => {
	const [active, setActive] = React.useState(0);

	const wallet = useState(globalWalletState());
	const [page, setPage] = React.useState(1);
	const [refreshing, setRefreshing] = React.useState(false);
	const [loadedAll, setLoadedAll] = React.useState(false);
	const { transactions = [] } = wallet.value;

	const loadMoreTransactions = async () => {
		if (!loadedAll) {
			setRefreshing(true);
			setPage(page + 1);
			const result = await getTransactions(wallet.value.address || '', page + 1, 20);
			if (result.length > 0) {
				wallet.transactions.merge(result);
			} else {
				setLoadedAll(true);
			}
		}

		setRefreshing(false);
	};

	const renderFooter = () => {
		if (!refreshing) return null;

		return (
			<View
				style={{
					position: 'relative',
					paddingVertical: 20,
					marginTop: 10,
					marginBottom: 10
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};

	const address = wallet.address.value;

	const filteredTransactions = (txs: TransactionProps[]) => {
		if (active === 1) return txs.filter((tx: any) => tx.to.toLowerCase() !== address.toLowerCase());
		if (active === 2) return txs.filter((tx: any) => tx.to.toLowerCase() === address.toLowerCase());
		return txs;
	};

	return (
		<WelcomeLayout>
			<HeaderContainer>
				<Header />
				<Selector {...{ active, setActive }} />
			</HeaderContainer>

			<Body transactions={filteredTransactions(transactions)!} {...{ loadMoreTransactions, renderFooter }} />
		</WelcomeLayout>
	);
};

export default TransactionsScreen;
