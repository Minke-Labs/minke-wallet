import { providers } from 'ethers';
import { ZapperSubtransaction, ZapperTransaction } from './wallet';

export const convertTransactionResponse = ({
	transaction,
	amount,
	direction,
	symbol,
	pending = true,
	subTransactions = []
}: {
	transaction: providers.TransactionResponse;
	amount: string;
	direction: 'incoming' | 'outgoing' | 'exchange';
	symbol: string;
	pending?: boolean;
	subTransactions?: ZapperSubtransaction[];
}): ZapperTransaction => {
	const { from, to, timestamp, blockHash, hash } = transaction;
	return {
		from,
		destination: to!,
		timeStamp: (timestamp || new Date().getTime()).toString(),
		txSuccessful: pending || !!blockHash,
		hash,
		pending,
		amount,
		direction,
		symbol,
		subTransactions
	};
};

export const filterPendingTransactions = (
	pendingTransactions: ZapperTransaction[],
	apiTransactions: ZapperTransaction[]
): ZapperTransaction[] => {
	const hashes = apiTransactions.map(({ hash }) => hash);

	return pendingTransactions.filter(({ hash }) => !hashes.includes(hash));
};
