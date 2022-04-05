/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

export const TransactionsContext = React.createContext<any>(null);

const TransactionsProvider: React.FC = ({ children }) => {
	const [txTo, setTxTo] = useState('');
	const [pending, setPending] = useState(false);

	const tx = {
		to: txTo,
		pending
	};

	const setTxPending = (to: string, pnd: boolean) => {
		setPending(pnd);
		setTxTo(to);
	};

	return (
		<TransactionsContext.Provider value={{ tx, setTxPending }}>{children}</TransactionsContext.Provider>
	);
};

export default TransactionsProvider;
