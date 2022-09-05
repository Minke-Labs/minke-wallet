import { MinkeToken } from '@models/types/token.types';
import { UserProps, ResultProps } from '../../Send.types';

export interface TransactionTransferProps {
	user: UserProps;
	token: MinkeToken;
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
}
