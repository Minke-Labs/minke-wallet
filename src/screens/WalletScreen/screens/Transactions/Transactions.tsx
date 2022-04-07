import React from 'react';
import { ActivityIndicator } from '@components';
import { View } from 'react-native';
import { TransactionsProps } from './Transactions.types';
import { TransactionsTable } from './TransactionsTable/TransactionsTable';

const Transactions: React.FC<TransactionsProps> = ({ loading, onSeeAllTransactions, onAddFunds }) => {
	if (loading) {
		return (
			<View style={{ paddingTop: 24 }}>
				<ActivityIndicator />
			</View>
		);
	}

	return <TransactionsTable {...{ onAddFunds, onSeeAllTransactions }} />;
};
export default Transactions;
