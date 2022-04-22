import React from 'react';
import { Button, Text, Transaction } from '@components';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { format } from 'date-fns';
import { globalWalletState } from '@stores/WalletStore';
import { useTheme, useTransactions } from '@hooks';
import { groupBy } from 'lodash';
import {
	thisMonthTimestamp,
	thisYearTimestamp,
	todayTimestamp,
	yesterdayTimestamp
} from '@src/components/Transaction/Transaction.utils';
import { NoTransactionsYet } from '../NoTransactionsYet/NoTransactionsYet';
import { TransactionsTableProps } from './TransactionsTable.types';
import styles from './TransactionsTable.styles';

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ onAddFunds, onSeeAllTransactions }) => {
	const { colors } = useTheme();
	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;
	const { pendingTransactions } = useTransactions();
	const allTransactions = [...pendingTransactions, ...transactions].slice(0, 10);

	const groupTransactionByDate = ({ timeStamp }: { timeStamp: string }) => {
		const ts = parseInt(timeStamp, 10) * 1000;

		if (ts > todayTimestamp) return 'Today';
		if (ts > yesterdayTimestamp) return 'Yesterday';
		if (ts > thisMonthTimestamp) return 'This Month';

		return format(ts, `MMMM${ts > thisYearTimestamp ? '' : ' yyyy'}`);
	};

	const transactionsByDate = groupBy(allTransactions, groupTransactionByDate);
	const sectionedTransactions = Object.keys(transactionsByDate).map((section) => ({
		data: transactionsByDate[section],
		title: section
	}));

	if (allTransactions.length > 0) {
		return (
			<View style={styles.container}>
				{sectionedTransactions.map(({ data, title }) => (
					<View style={[styles.section, { borderBottomColor: colors.background1 }]} key={title}>
						<Text type="a" weight="bold" color="text3" marginBottom={16}>
							{title}
						</Text>
						{data.map((item) => (
							<Transaction transaction={item} key={item.hash} />
						))}
					</View>
				))}

				<Button onPress={onSeeAllTransactions} mode="text" title="See all" />
			</View>
		);
	}

	return <NoTransactionsYet {...{ onAddFunds }} />;
};
