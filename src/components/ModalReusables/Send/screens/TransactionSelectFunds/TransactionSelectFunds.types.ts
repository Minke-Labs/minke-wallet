import { MinkeToken } from '@models/types/token.types';
import { UserProps } from '../../Send.types';

interface TransactionSelectFundsProps {
	user: UserProps;
	onSelected: (token: MinkeToken) => void;
}

export type { TransactionSelectFundsProps };
