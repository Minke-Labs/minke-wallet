import { ZapperTransaction } from '@models/wallet';

export interface BodyProps {
	transactions: ZapperTransaction[];
	renderFooter: any;
}
