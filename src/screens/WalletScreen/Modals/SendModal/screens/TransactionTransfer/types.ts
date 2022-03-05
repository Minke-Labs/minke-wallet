import { WalletToken } from '@models/wallet';
import { UserProps } from '../../types';
import { ResultProps } from '../../../../WalletScreen.types';

export interface TransactionTransferProps {
	user: UserProps;
	token: WalletToken;
	onDismiss: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
}
