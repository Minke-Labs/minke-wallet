import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import { TransactionPeriod as ITransactionPeriod } from '@src/contexts/TransactionsContext/TransactionsContext';
import Transaction from '../Transaction/Transaction';

const styles = StyleSheet.create({
	section: {
		marginBottom: 32,
		borderBottomWidth: 1
	}
});

const TransactionPeriod: React.FC<ITransactionPeriod> = ({ title, data }) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.section, { borderBottomColor: colors.background1 }]}>
			<Text type="a" weight="bold" color="text3" marginBottom={16}>
				{title}
			</Text>
			{data.map((item) => (
				<Transaction transaction={item} key={item.hash} />
			))}
		</View>
	);
};

export default TransactionPeriod;
