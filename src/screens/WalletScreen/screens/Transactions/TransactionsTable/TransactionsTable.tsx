/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Transaction } from '@components';
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
	const allTransactions = [...pendingTransactions, ...transactions];

	if (allTransactions.length > 0) {
		return (
			<View style={styles.container}>
				{allTransactions.map(
					(item: any, idx: number) =>
						item.value && <Transaction transaction={item} key={`${item.hash}${item.value}${idx}`} />
				)}

				<Button onPress={onSeeAllTransactions} mode="text" title="See all" />
			</View>
		);
	}

	return <NoTransactionsYet {...{ onAddFunds }} />;
};
