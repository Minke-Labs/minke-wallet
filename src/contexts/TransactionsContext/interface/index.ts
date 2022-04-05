/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Transaction } from '@models/wallet';

export type TransactionAction =
	| { type: 'ADD_TRANSACTION'; payload: Partial<Transaction> }
	| { type: 'EDIT_TRANSACTION'; payload: { id: string; title: string } };

export interface ContextProps {
	transactions: Transaction[];
	setNewState: React.Dispatch<React.SetStateAction<Transaction[] | undefined>>;
	// state: Transaction[];
	// dispatch: React.Dispatch<TransactionAction>;
}
