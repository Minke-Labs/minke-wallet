import React, { useEffect, useMemo } from 'react';
import { useState } from '@hookstate/core';
import { getZapperTransactions, ZapperTransaction } from '@models/wallet';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { filterPendingTransactions } from '@models/transaction';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import {
	thisMonthTimestamp,
	thisYearTimestamp,
	todayTimestamp,
	yesterdayTimestamp
} from '@src/components/Transaction/Transaction.utils';
import { groupBy } from 'lodash';

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
	addPendingTransaction: (transaction: ZapperTransaction) => void;
}

export const TransactionsContext = React.createContext<TransactionContextProps>({} as TransactionContextProps);

const TransactionsProvider: React.FC = ({ children }) => {
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [pendingTransactions, setPendingTransactions] = React.useState<ZapperTransaction[]>([]);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const {
		address,
		privateKey,
		network: { chainId },
		transactions = []
	} = state.value;

	const fetchTransactions = async () => {
		setLoading(true);
		const { data = [] } = await getZapperTransactions(address!);
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions: data, balance });
		setLoading(false);
		setPendingTransactions(filterPendingTransactions(pendingTransactions, data));
		setLastTransationsFetch(new Date().getTime());
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

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
		setPendingTransactions([]);
	}, [chainId, address]);

	const addPendingTransaction = (transaction: ZapperTransaction) => {
		setPendingTransactions([transaction, ...pendingTransactions]);
	};

	const allTransactions = [...pendingTransactions, ...transactions];

	const groupTransactionByDate = ({ timeStamp }: { timeStamp: string }) => {
		const ts = parseInt(timeStamp, 10) * 1000;

		if (ts > todayTimestamp) return 'Today';
		if (ts > yesterdayTimestamp) return 'Yesterday';
		if (ts > thisMonthTimestamp) return 'This Month';

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

	const obj = useMemo(
		() => ({
			loading,
			transactions: sectionedTransactions,
			homeTransactions,
			hasTransactions: allTransactions.length > 0,
			fetchTransactions,
			addPendingTransaction
		}),
		[loading, address, chainId, pendingTransactions, transactions]
	);

	return <TransactionsContext.Provider value={obj}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
