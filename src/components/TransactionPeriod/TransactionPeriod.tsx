import React from 'react';
import { useTheme } from '@hooks';
import { TransactionPeriod as ITransactionPeriod } from '@src/contexts/TransactionsContext/TransactionsContext';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Transaction from '@src/components/Transaction/Transaction';

const TransactionPeriod: React.FC<ITransactionPeriod> = ({ title, data }) => {
	const { colors } = useTheme();
	return (
		<View
			mt="xxs"
			mb="m"
			style={{ borderBottomWidth: 1, borderBottomColor: colors.background1 }}
		>
			<Text
				type="a"
				weight="bold"
				color="text3"
				mb="xs"
			>
				{title}
			</Text>
			{data.map((item) => (
				<Transaction transaction={item} key={item.hash} />
			))}
		</View>
	);
};

export default TransactionPeriod;
