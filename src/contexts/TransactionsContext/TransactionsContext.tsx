/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { useFocusEffect } from '@react-navigation/native';
import { getTransactions } from '@models/wallet';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import useAmplitude from '../../hooks/useAmplitude';

export const TransactionsContext = React.createContext<any>(null);

const TransactionsProvider: React.FC = ({ children }) => {
	const testing = 'testing';
	const { track } = useAmplitude();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();
	const [pending, setPending] = React.useState(false);
	const [pendingName, setPendingName] = React.useState('');

	const fetchTransactions = async () => {
		track('Wallet Screen Opened');
		setLoading(true);
		const { address, privateKey } = state.value;
		const transactions = await getTransactions(address || '');
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions, balance });
		setLoading(false);
		setLastTransationsFetch(new Date().getTime());
		setPending(false);
		setPendingName('');
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

	// useEffect(() => {
	// console.log('PENDING: ', pending);
	// console.log('PENDING NAME: ', pendingName);
	// }, [pending, pendingName]);

	return (
		<TransactionsContext.Provider
			value={{ pending, setPending, pendingName, setPendingName, testing, loading, fetchTransactions }}
		>
			{children}
		</TransactionsContext.Provider>
	);
};

export default TransactionsProvider;
