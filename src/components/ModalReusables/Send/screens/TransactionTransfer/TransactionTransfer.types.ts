import { MinkeToken } from '@models/types/token.types';
import { UserProps } from '../../Send.types';

export interface TransactionTransferProps {
	user: UserProps;
	token: MinkeToken;
	onDismiss: () => void;
	onError: () => void;
}
