import React, { useCallback } from 'react';
import { whale2Img } from '@images';
import { Text, Button } from '@components';
import { View, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import Transaction from './Transaction';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingTop: 14
	},
	tableContainer: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 14
	},
	image: {
		width: 152,
		height: 152
	}
});

interface TransactionsProps {
	loading: boolean;
	onSeeAllTransactions: () => void;
	onAddFunds: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ loading, onSeeAllTransactions, onAddFunds }) => {
	const { colors } = useTheme();
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
		return (
			<View style={styles.tableContainer}>
				<Image source={whale2Img} style={styles.image} />
				<Text color="text4" weight="medium" marginBottom={16}>
					No transactions here
				</Text>
				<Text color="text3" weight="bold" marginBottom={64}>
					Let&apos;s get started?
				</Text>
				<Button onPress={onAddFunds} iconLeft="addStroke" title="Add funds to start" marginBottom={14} />
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
