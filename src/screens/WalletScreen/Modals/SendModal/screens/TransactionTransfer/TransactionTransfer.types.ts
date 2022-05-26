import { MinkeToken } from '@models/token';
import { UserProps } from '../../SendModal.types';
import { ResultProps } from '../../../../WalletScreen.types';

export interface TransactionTransferProps {
	user: UserProps;
	token: MinkeToken;
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
}
