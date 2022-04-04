import React from 'react';
import { format } from 'date-fns';
import Card from './Card/Card';
import { TransactionProps } from './Transaction.types';
import { useTransaction } from './Transaction.hooks';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
	const { received, timestamp, formattedSource, value, tokenDecimal, tokenSymbol, token, isError, openTransaction } =
		useTransaction({ transaction });

	return (
		<Card
			title={format(timestamp, 'MM/dd/yyyy hh:mm aa')}
			subtitle={`${received ? 'From' : 'To'}: ${formattedSource}`}
			onPress={openTransaction}
			failed={isError === '1'}
			pending={false}
			{...{ value, token, tokenDecimal, received, tokenSymbol }}
		/>
	);
};

export default Transaction;
