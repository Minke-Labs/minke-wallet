import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Headline, useTheme } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@src/stores/WalletStore';
import { getTransactions } from '@src/model/wallet';
import Container from 'old/src/components/Container';
import globalStyles from 'old/src/components/global.styles';
import Transaction from '../home/finance-panel/transactions/Transaction';

const TransactionsScreen = () => {
	const wallet = useState(globalWalletState());
	const [page, setPage] = React.useState(1);
	const [refreshing, setRefreshing] = React.useState(false);
	const [loadedAll, setLoadedAll] = React.useState(false);
	const { colors } = useTheme();
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
				<ActivityIndicator animating size="large" color={colors.primary} />
			</View>
		);
	};

	return (
		<Container>
			<View style={globalStyles.padding}>
				<Headline style={globalStyles.headline}>Transactions</Headline>

				<FlatList
					style={{ marginTop: 24, marginBottom: 24 }}
					data={transactions}
					renderItem={({ item }) => <Transaction transaction={item} />}
					keyExtractor={(transaction, index) => `${transaction.hash}${transaction.value}${index}`}
					onEndReached={loadMoreTransactions}
					onEndReachedThreshold={0.5}
					ListFooterComponent={renderFooter}
				/>
			</View>
		</Container>
	);
};

export default TransactionsScreen;
