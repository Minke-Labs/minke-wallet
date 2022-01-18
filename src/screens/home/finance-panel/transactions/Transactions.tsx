import React from 'react';
import { View } from 'react-native';
import { Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { globalWalletState } from '@stores/WalletStore';
import { makeStyles } from './styles';
import Transaction from './Transaction';

const Transactions = ({ loading }: { loading: boolean }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const wallet = globalWalletState();
	const { transactions = [] } = wallet.value;

	return (
		<View style={styles.tabsTransactions}>
			{loading ? (
				<ActivityIndicator animating color={colors.primary} />
			) : (
				<>
					<View style={styles.row}>
						<Text style={styles.transactionDateLabel}>Today</Text>
						<Text style={styles.fontSizeSmall}>Day balance: $00.00</Text>
					</View>

					<View style={styles.transactionDayRow}>
						{transactions.map((transaction) => (
							<Transaction transaction={transaction} key={`${transaction.hash}${transaction.value}`} />
						))}
					</View>
				</>
			)}
		</View>
	);
};

export default Transactions;
