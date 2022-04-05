/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-no-constructed-context-values */
import { globalWalletState } from '@stores/WalletStore';
import React, { useEffect } from 'react';
import { getTransactions, Transaction } from '@models/wallet';
import { useState } from '@hookstate/core';
import { TransactionAction, ContextProps } from './interface';

export const TransactionsContext = React.createContext({} as ContextProps);

const TransactionsProvider: React.FC = ({ children }) => {
	// const wallet = useState(globalWalletState());
	// const { transactions = [] } = wallet.value;
	const [newState, setNewState] = React.useState<any>();

	// const reducer = useCallback((state: Transaction[], action: TransactionAction): Transaction[] => {
	// 	switch (action.type) {
	// 		case 'ADD_TRANSACTION':
	// 			// return [...state, ...action.payload];
	// 			return [...state];

	// 		default:
	// 			return state;
	// 	}
	// }, [transactions]);

	// const [state, dispatch] = useReducer(reducer, transactions);

	// console.log('\n\n\n');
	// console.log('STATE INSIDE: ', JSON.stringify(newState));

	// const dispatch = (state: any) => {
	// 	setNewState([...newState, ...state]);
	// };

	return (
		<TransactionsContext.Provider value={{ transactions: newState!, setNewState }}>
			{children}
		</TransactionsContext.Provider>
	);
};

export default TransactionsProvider;
