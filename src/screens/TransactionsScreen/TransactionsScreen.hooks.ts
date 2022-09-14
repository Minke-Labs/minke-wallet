import { useState } from 'react';
import { ZapperTransaction } from '@models/wallet';
import { useTransactions } from '@hooks';
import { TransactionPeriod } from '@src/contexts/TransactionsContext/TransactionsContext';

export const useTransactionsScreen = () => {
	const [active, setActive] = useState(0);
	const { transactions } = useTransactions();

	const filteredTransactions = (txs: TransactionPeriod[]): TransactionPeriod[] => {
		if (active === 1) {
			return txs.map(({ data, title }) => ({
				title,
				data: data.filter((tx: ZapperTransaction) => tx.direction === 'outgoing')
			}));
		}
		if (active === 2) {
			return txs.map(({ data, title }) => ({
				title,
				data: data.filter((tx: ZapperTransaction) => tx.direction === 'incoming')
			}));
		}
		return txs;
	};

	return {
		transactions: filteredTransactions(transactions),
		active,
		setActive
	};
};
