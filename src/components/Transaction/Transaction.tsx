import React from 'react';
import { formatUnits } from 'ethers/lib/utils';
import { format } from 'date-fns';
import Text from '../Text/Text';
import Card from '../Card/Card';
import TransactionIcon from '../TransactionIcon/TransactionIcon';
import { truncate } from './Transaction.utils';
import { TransactionProps } from './Transaction.types';
import { useTransaction } from './Transaction.hooks';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
	const { received, timestamp, formattedSource, value, tokenDecimal, tokenSymbol, token, isError, openTransaction } =
		useTransaction({ transaction });

	return (
		<Card
			image={<TransactionIcon received={received} />}
			title={format(timestamp, 'MM/dd/yyyy hh:mm aa')}
			subtitle={`${received ? 'From' : 'To'}: ${formattedSource}`}
			right={
				<Text style={{ fontSize: 12 }}>
					{value && Math.trunc(Number(formatUnits(value, tokenDecimal))) > 0
						? truncate(formatUnits(value, tokenDecimal), 2)
						: truncate(formatUnits(value, tokenDecimal), 6)}{' '}
					{tokenSymbol || token}
				</Text>
			}
			style={{ opacity: isError === '1' ? 0.3 : 1 }}
			onPress={openTransaction}
		/>
	);
};

export default Transaction;
