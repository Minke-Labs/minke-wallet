import React from 'react';
import { Button, TransactionPeriod } from '@components';
import { View } from 'react-native';
import { useTransactions } from '@hooks';
import { NoTransactionsYet } from '../NoTransactionsYet/NoTransactionsYet';
import { TransactionsTableProps } from './TransactionsTable.types';
import styles from './TransactionsTable.styles';

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ onAddFunds, onSeeAllTransactions }) => {
	const { transactions, hasTransactions } = useTransactions();

	if (hasTransactions) {
		return (
			<View style={styles.container}>
				{transactions.map(({ data, title }) => (
					<TransactionPeriod data={data} title={title} key={title} />
				))}

				<Button onPress={onSeeAllTransactions} mode="text" title="See all" />
			</View>
		);
	}

	return <NoTransactionsYet {...{ onAddFunds }} />;
};
