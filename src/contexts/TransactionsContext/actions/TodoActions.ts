import { TransactionAction, TransactionProps } from '../interface';

export const addTransaction = (transaction: TransactionProps): TransactionAction => ({
	type: 'ADD_TRANSACTION',
	payload: transaction
});

export const editTransaction = (id: string, title: string): TransactionAction => ({
	type: 'EDIT_TRANSACTION',
	payload: { id, title }
});
