import React, { useCallback } from 'react';
import { Button, ActivityIndicator, Transaction } from '@components';
import { View, FlatList } from 'react-native';
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
				<View>
					<FlatList
						keyExtractor={(item, idx) => `${item.hash}${item.value}${idx}`}
						ListFooterComponent={<Button onPress={onSeeAllTransactions} mode="text" title="See all" />}
						data={transactions}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => {
							if (item.value) {
								return <Transaction transaction={item} key={`${item.hash}${item.value}${index}`} />;
							}
							return null;
						}}
					/>
				</View>
			);
		}

		return <NoTransactionsYet {...{ onAddFunds }} />;
	}, [transactions]);

	return <View style={styles.container}>{loading ? <ActivityIndicator /> : <Table />}</View>;
};

export default Transactions;
