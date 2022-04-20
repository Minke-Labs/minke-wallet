import React from 'react';
import { format } from 'date-fns';
import CardTransaction from '../CardTransaction/CardTransaction';
import { TransactionProps } from './Transaction.types';
import { useTransaction } from './Transaction.hooks';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
	const {
		received,
		timestamp,
		formattedSource,
		value,
		tokenDecimal,
		tokenSymbol,
		token,
		isError,
		pending,
		openTransaction,
		topUp
	} = useTransaction({ transaction });

	return (
		<CardTransaction
			title={format(timestamp, 'MM/dd/yyyy hh:mm aa')}
			subtitle={topUp ? 'Adding via Apple Pay' : `${received ? 'From' : 'To'}: ${formattedSource}`}
			onPress={openTransaction}
			failed={isError === '1'}
			{...{ value, token, tokenDecimal, received, pending, tokenSymbol, topUp }}
		/>
	);
};

export default Transaction;
