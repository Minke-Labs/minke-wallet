import React, { useEffect, useMemo } from 'react';
import { useState } from '@hookstate/core';
import { getTransactions, Transaction } from '@models/wallet';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import useAmplitude from '../../hooks/useAmplitude';

interface TransactionContextProps {
	loading: boolean;
	pendingTransactions: Transaction[];
	fetchTransactions: () => void;
	addPendingTransaction: (transaction: Transaction) => void;
}

export const TransactionsContext = React.createContext<TransactionContextProps>({} as TransactionContextProps);

const TransactionsProvider: React.FC = ({ children }) => {
	const { track } = useAmplitude();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [pendingTransactions, setPendingTransactions] = React.useState<Transaction[]>([]);

	const fetchTransactions = async () => {
		track('Wallet Screen Opened'); // @TODO: Remove it from here
		setLoading(true);
		const { address, privateKey } = state.value;
		const transactions = await getTransactions(address || '');
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions, balance });
		setLoading(false);
		setPendingTransactions([]);
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

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
