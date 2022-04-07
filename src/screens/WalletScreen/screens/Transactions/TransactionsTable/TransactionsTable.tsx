/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Transaction, CardTransaction } from '@components';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useTransactions } from '@hooks';
import { NoTransactionsYet } from '../NoTransactionsYet/NoTransactionsYet';
import { TransactionsTableProps } from './TransactionsTable.types';

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ onAddFunds, onSeeAllTransactions }) => {
	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;
	const { pending, pendingName } = useTransactions();

	if (transactions.length > 0) {
		return (
			<View style={{ height: '100%' }}>
				{pending && <CardTransaction subtitle={pendingName} pending />}

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
