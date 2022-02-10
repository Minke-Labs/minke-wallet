/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from 'react';
import { whale2Img } from '@images';
import { Text, Button } from '@components';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import Transaction from './Transaction';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 14,
		paddingTop: 14
	},
	tableContainer: {
		flex: 1,
		alignItems: 'center'
	},
	image: {
		width: 152,
		height: 152,
		marginTop: 34
	}
});

interface TransactionsProps {
	loading: boolean;
	onSeeAllTransactions: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ loading, onSeeAllTransactions }) => {
	const { colors } = useTheme();
	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;

	const Table = useCallback(() => {
		if (transactions.length > 0) {
			return (
				<View>
					{transactions.map((transaction, index) => {
						if (transaction.value) {
							return (
								<Transaction
									transaction={transaction}
									// eslint-disable-next-line react/no-array-index-key
									key={`${transaction.hash}${transaction.value}${index}`}
								/>
							);
						}
						return null;
					})}
					<Button onPress={onSeeAllTransactions} mode="text" title="See all" />
				</View>
			);
		}
		return (
			<View style={styles.tableContainer}>
				<Image source={whale2Img} style={styles.image} />
				<Text weight="medium" marginBottom={16}>
					No transactions here
				</Text>
				<Text weight="bold" marginBottom={64}>
					Let's get started?
				</Text>
				<Button
					iconLeft="addStroke"
					title="Add funds to start"
					onPress={() => console.log('Add funds to start!')}
					marginBottom={14}
				/>
			</View>
		);
	}, [transactions]);

	return (
		<View style={styles.container}>
			{loading ? <ActivityIndicator animating color={colors.text7} /> : <Table />}
		</View>
	);
};

export default Transactions;
