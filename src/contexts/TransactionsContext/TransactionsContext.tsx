import React, { useEffect, useMemo } from 'react';
import { getZapperTransactions, ZapperTransaction } from '@models/wallet';
import { filterPendingTransactions } from '@models/transaction';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import { thisMonthTimestamp, thisYearTimestamp, todayTimestamp, yesterdayTimestamp } from '@models/timestamps';
import { groupBy } from 'lodash';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import useLanguage from '../../hooks/useLanguage';

export interface TransactionPeriod {
	data: ZapperTransaction[];
	title: string;
}

interface TransactionContextProps {
	loading: boolean;
	transactions: TransactionPeriod[];
	homeTransactions: TransactionPeriod[];
	hasTransactions: boolean;
	fetchTransactions: () => void;
	pendingTransactions: ZapperTransaction[];
	addPendingTransaction: (transaction: ZapperTransaction) => void;
	updatePendingTransaction: (hash: string, newTransaction: ZapperTransaction) => void;
}

export const TransactionsContext = React.createContext<TransactionContextProps>({} as TransactionContextProps);

const TransactionsProvider: React.FC = ({ children }) => {
	const { i18n } = useLanguage();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [pendingTransactions, setPendingTransactions] = React.useState<ZapperTransaction[]>([]);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const {
		address,
		network: { chainId },
		transactions = []
	} = state.value;

	const fetchTransactions = async () => {
		setLoading(true);
		const { data = [] } = await getZapperTransactions(address!);
		state.merge({ transactions: data });
		setLoading(false);
		setPendingTransactions(filterPendingTransactions(pendingTransactions, data));
		setLastTransationsFetch(new Date().getTime());
	};

	useFocusEffect(() => {
		if (
			!loading &&
			((lastTransactionsFetch && new Date().getTime() - lastTransactionsFetch > 10000) ||
				state.transactions.value === undefined)
		) {
			fetchTransactions();
		}
	});

	useEffect(() => {
		fetchTransactions();
		setPendingTransactions([]);
	}, [chainId, address]);

	const addPendingTransaction = (transaction: ZapperTransaction) => {
		setPendingTransactions([transaction, ...pendingTransactions]);
	};

	const allTransactions = [...pendingTransactions, ...transactions];

	const groupTransactionByDate = ({ timeStamp }: { timeStamp: string }) => {
		const ts = parseInt(timeStamp, 10) * 1000;

		if (ts > todayTimestamp) return i18n.t('Components.Transaction.today');
		if (ts > yesterdayTimestamp) return i18n.t('Components.Transaction.yesterday');
		if (ts > thisMonthTimestamp) return i18n.t('Components.Transaction.this_month');

		return format(ts, `MMMM${ts > thisYearTimestamp ? '' : ' yyyy'}`);
	};

	const transactionsByDate = groupBy(allTransactions, groupTransactionByDate);
	const homeTransactionsByDate = groupBy(allTransactions.slice(0, 10), groupTransactionByDate);

	const sectionedTransactions = Object.keys(transactionsByDate).map((section) => ({
		data: transactionsByDate[section],
		title: section
	}));

	const homeTransactions = Object.keys(homeTransactionsByDate).map((section) => ({
		data: homeTransactionsByDate[section],
		title: section
	}));

	const updatePendingTransaction = (hash: string, newTransaction: ZapperTransaction) => {
		setPendingTransactions(
			pendingTransactions.map((transaction) => (transaction.hash === hash ? newTransaction : transaction))
		);
	};

	const obj = useMemo(
		() => ({
			loading,
			transactions: sectionedTransactions,
			homeTransactions,
			hasTransactions: allTransactions.length > 0,
			fetchTransactions,
			pendingTransactions,
			addPendingTransaction,
			updatePendingTransaction
		}),
		[loading, address, chainId, pendingTransactions, transactions]
	);

	return <TransactionsContext.Provider value={obj}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
