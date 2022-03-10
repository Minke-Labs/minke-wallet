import { Transaction as TransactionProps } from '@models/wallet';

export interface BodyProps {
	transactions: TransactionProps[];
	loadMoreTransactions: any;
	renderFooter: any;
}
