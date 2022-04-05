/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Button, ActivityIndicator, Transaction, CardTransaction } from '@components';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { styles } from './Transactions.styles';
import { TransactionsProps } from './Transactions.types';
import { NoTransactionsYet } from './NoTransactionsYet/NoTransactionsYet';

const Transactions: React.FC<TransactionsProps> = ({ loading, onSeeAllTransactions, onAddFunds }) => {
	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;

	const Table = useCallback(() => {
		if (transactions.length > 0) {
			return (
				<View style={{ height: '100%' }}>
					<CardTransaction subtitle="Some pending tx" pending />

					{transactions.map(
						(item: any, idx: number) =>
							item.value && <Transaction transaction={item} key={`${item.hash}${item.value}${idx}`} />
					)}

					<Button onPress={onSeeAllTransactions} mode="text" title="See all" />
				</View>
			);
		}

		return <NoTransactionsYet {...{ onAddFunds }} />;
	}, [transactions]);

	return (
		<View style={styles.container}>
			{loading ? (
				<View style={{ height: 400 }}>
					<ActivityIndicator />
				</View>
			) : (
				<Table />
			)}
		</View>
	);
};

export default Transactions;
