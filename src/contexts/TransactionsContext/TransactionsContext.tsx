import React, { useEffect, useMemo } from 'react';
import { useState } from '@hookstate/core';
import { getTransactions, Transaction } from '@models/wallet';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { filterPendingTransactions } from '@models/transaction';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionContextProps {
	loading: boolean;
	pendingTransactions: Transaction[];
	fetchTransactions: () => void;
	addPendingTransaction: (transaction: Transaction) => void;
}

export const TransactionsContext = React.createContext<TransactionContextProps>({} as TransactionContextProps);

const TransactionsProvider: React.FC = ({ children }) => {
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [pendingTransactions, setPendingTransactions] = React.useState<Transaction[]>([]);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();

	const fetchTransactions = async () => {
		setLoading(true);
		const { address, privateKey } = state.value;
		const transactions = await getTransactions(address || '');
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions, balance });
		setLoading(false);
		setPendingTransactions(filterPendingTransactions(pendingTransactions, transactions));
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

	const addPendingTransaction = (transaction: Transaction) => {
		setPendingTransactions([transaction, ...pendingTransactions]);
	};

	const obj = useMemo(
		() => ({ loading, pendingTransactions, fetchTransactions, addPendingTransaction }),
		[loading, state.value, pendingTransactions]
	);

	return <TransactionsContext.Provider value={obj}>{children}</TransactionsContext.Provider>;
};

export default TransactionsProvider;
