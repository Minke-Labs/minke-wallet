/* eslint-disable no-tabs */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
// import { useFocusEffect } from '@react-navigation/native';
import { getTransactions, smallWalletAddress } from '@models/wallet';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import useAmplitude from '../../hooks/useAmplitude';

interface PendingTransaction {
	pendingName: string;
	amount: number;
	symbol: string;
}

export const TransactionsContext = React.createContext<any>(null);

const TransactionsProvider: React.FC = ({ children }) => {
	const { track } = useAmplitude();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	// const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const [pendingTransactions, setPendingTransactions] = React.useState<PendingTransaction[]>([]);

	const fetchTransactions = async () => {
		track('Wallet Screen Opened');
		setLoading(true);
		const { address, privateKey } = state.value;
		const transactions = await getTransactions(address || '');
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions, balance });
		setLoading(false);
		// setLastTransationsFetch(new Date().getTime());
		setPendingTransactions([]);
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

	const addPendingTransaction = (pendingName: string, amount: number, symbol: string) => {
		setPendingTransactions([
			{
				pendingName: `To: ${smallWalletAddress(pendingName)}`,
				amount,
				symbol
			},
			...pendingTransactions
		]);
	};

	// useFocusEffect(() => {
	// 	if (
	// 		!loading &&
	// 		((lastTransactionsFetch && new Date().getTime() - lastTransactionsFetch > 10000) ||
	// 			state.transactions.value === undefined)
	// 	) {
	// 		fetchTransactions();
	// 	}
	// });

	return (
		<TransactionsContext.Provider
			value={{
				loading,
				fetchTransactions,
				addPendingTransaction,
				pendingTransactions
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
};

export default TransactionsProvider;
