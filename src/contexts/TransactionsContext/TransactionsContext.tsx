/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { useAmplitude } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { getTransactions } from '@models/wallet';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';

export const TransactionsContext = React.createContext<any>(null);

const TransactionsProvider: React.FC = ({ children }) => {
	const { track } = useAmplitude();
	const state = useState(globalWalletState());
	const [loading, setLoading] = React.useState(true);
	const [lastTransactionsFetch, setLastTransationsFetch] = React.useState<number>();

	const fetchTransactions = async () => {
		track('Wallet Screen Opened');
		setLoading(true);
		const { address, privateKey } = state.value;
		const transactions = await getTransactions(address || '');
		const { balance } = await fetchTokensAndBalances(privateKey, address);
		state.merge({ transactions, balance });
		setLoading(false);
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

	return (
		<TransactionsContext.Provider value={{ loading, fetchTransactions }}>
			{children}
		</TransactionsContext.Provider>
	);
};

export default TransactionsProvider;
