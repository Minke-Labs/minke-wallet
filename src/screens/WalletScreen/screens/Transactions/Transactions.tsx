import React from 'react';
import { ActivityIndicator } from '@components';
import { View } from 'react-native';
import { styles } from './Transactions.styles';
import { TransactionsProps } from './Transactions.types';
import { TransactionsTable } from './TransactionsTable/TransactionsTable';

const Transactions: React.FC<TransactionsProps> = ({ loading, onSeeAllTransactions, onAddFunds }) => (
	<View style={styles.container}>
		{loading ? (
			<View style={{ height: 400 }}>
				<ActivityIndicator />
			</View>
		) : (
			<TransactionsTable {...{ onAddFunds, onSeeAllTransactions }} />
		)}
	</View>
);
export default Transactions;
