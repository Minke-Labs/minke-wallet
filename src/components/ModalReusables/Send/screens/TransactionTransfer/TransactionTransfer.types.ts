import { MinkeGasToken } from '@models/types/token.types';
import { UserProps, ResultProps } from '../../Send.types';

export interface TransactionTransferProps {
	user: UserProps;
	token: MinkeGasToken;
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
}
