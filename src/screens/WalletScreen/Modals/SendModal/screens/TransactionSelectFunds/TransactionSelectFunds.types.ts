import { MinkeToken } from '@models/token';
import { UserProps } from '../../SendModal.types';

interface TransactionSelectFundsProps {
	user: UserProps;
	onSelected: (token: MinkeToken) => void;
	tokens: MinkeToken[];
}

export type { TransactionSelectFundsProps };
