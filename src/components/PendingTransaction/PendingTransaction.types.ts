export interface PendingTransactionProps {
	address: string;
	amount: string;
	symbol: string;
	pending: boolean;
	minAgo: number;
}
