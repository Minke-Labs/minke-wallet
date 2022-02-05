import React, { useCallback } from 'react';
import { useColorScheme, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { globalWalletState } from '@src/stores/WalletStore';
import AddFundsButton from 'old/src/components/AddFundsButton';
import PrimaryButton from 'old/src/components/PrimaryButton';
import Transaction from './Transaction';
import { makeStyles } from './styles';

const Transactions = ({ loading, onSeeAllTransactions }: { loading: boolean; onSeeAllTransactions: () => void }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());
	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;

	const Table = useCallback(() => {
		if (transactions.length > 0) {
			return (
				<View style={styles.transactionDayRow}>
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
					<PrimaryButton onPress={onSeeAllTransactions} mode="text">
						See all
					</PrimaryButton>
				</View>
			);
		}
		return (
			<View style={{ alignItems: 'center' }}>
				<View style={styles.netWorthIcon}>
					<MaterialIcons name="account-balance-wallet" size={32} color={colors.text} />
				</View>
				<Text style={styles.transactionsText}>Your transactions will appear here</Text>
				<Text style={styles.startedText}>Let&apos;s get started?</Text>
				<AddFundsButton
					button={
						// eslint-disable-next-line react/jsx-wrap-multilines
						<PrimaryButton>
							<MaterialCommunityIcons name="plus-circle-outline" size={20} />
							Add funds to start
						</PrimaryButton>
					}
				/>
			</View>
		);
	}, [transactions]);

	return (
		<View style={styles.tabsTransactions}>
			{loading ? <ActivityIndicator animating color={colors.primary} /> : <Table />}
		</View>
	);
};

export default Transactions;
