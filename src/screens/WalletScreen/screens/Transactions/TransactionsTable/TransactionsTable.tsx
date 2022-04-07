/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Transaction, CardTransaction } from '@components';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useTransactions } from '@hooks';
import { NoTransactionsYet } from '../NoTransactionsYet/NoTransactionsYet';
import { TransactionsTableProps } from './TransactionsTable.types';
import styles from './TransactionsTable.styles';

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ onAddFunds, onSeeAllTransactions }) => {
	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;
	const { pendingTransactions } = useTransactions();

	if (transactions.length > 0) {
		return (
			<View style={styles.container}>
				{pendingTransactions.map((tx: any, idx: number) => (
					<CardTransaction
						key={idx}
						subtitle={tx.pendingName}
						value={tx.amount}
						tokenSymbol={tx.symbol}
						pending
					/>
				))}

				{transactions.map(
					(item: any, idx: number) =>
						item.value && <Transaction transaction={item} key={`${item.hash}${item.value}${idx}`} />
				)}

				<Button onPress={onSeeAllTransactions} mode="text" title="See all" />
			</View>
		);
	}

	return <NoTransactionsYet {...{ onAddFunds }} />;
};
