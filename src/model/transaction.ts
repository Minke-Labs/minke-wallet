import { providers } from 'ethers';
import { ZapperSubtransaction, ZapperTransaction } from './wallet';

export const convertTransactionResponse = ({
	transaction,
	amount,
	direction,
	symbol,
	pending = true,
	subTransactions = [],
	destination
}: {
	transaction: providers.TransactionResponse;
	amount: string;
	direction: 'incoming' | 'outgoing' | 'exchange';
	symbol: string;
	pending?: boolean;
	subTransactions?: ZapperSubtransaction[];
	destination?: string;
}): ZapperTransaction => {
	const { from, to, timestamp, blockHash, hash, chainId } = transaction;
	return {
		from,
		destination: destination || to!,
		timeStamp: (timestamp || new Date().getTime() / 1000).toString(),
		txSuccessful: pending || !!blockHash,
		hash,
		pending,
		amount,
		direction,
		symbol,
		subTransactions,
		chainId
	};
};

export const filterPendingTransactions = (
	pendingTransactions: ZapperTransaction[],
	apiTransactions: ZapperTransaction[]
): ZapperTransaction[] => {
	const hashes = apiTransactions.map(({ hash }) => hash);

	return pendingTransactions.filter(({ hash }) => !hashes.includes(hash));
};
