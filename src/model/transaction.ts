import { providers } from 'ethers';
import { Transaction } from './wallet';

export const convertTransactionResponse = (
	transaction: providers.TransactionResponse,
	tokenValue: string, // transaction value is not added from the provider if its a contract interaction
	tokenSymbol: string,
	tokenDecimal = 18,
	pending = true
): Transaction => {
	const { from, to, timestamp, blockHash, hash } = transaction;
	return {
		from,
		to,
		timeStamp: (timestamp || new Date().getTime()).toString(),
		isError: pending || blockHash ? '0' : '1',
		value: tokenValue,
		tokenSymbol,
		tokenDecimal: tokenDecimal.toString(),
		hash,
		pending
	} as Transaction;
};

export const filterPendingTransactions = (
	pendingTransactions: Transaction[],
	apiTransactions: Transaction[]
): Transaction[] => {
	const hashes = apiTransactions.map(({ hash }) => hash);

	return pendingTransactions.filter(({ hash }) => !hashes.includes(hash));
};
