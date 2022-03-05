import { WalletToken } from '@src/model/wallet';
import { UserProps } from '../../types';

interface TransactionSelectFundsProps {
	user: UserProps;
	onSelected: (token: WalletToken) => void;
}

export type { TransactionSelectFundsProps };
