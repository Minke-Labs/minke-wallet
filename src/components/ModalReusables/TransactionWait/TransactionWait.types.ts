import { MinkeToken } from '@models/types/token.types';

export interface TransactionWaitModalProps {
	onDismiss: () => void;
	fromToken: MinkeToken;
	toToken?: MinkeToken | undefined;
	transactionHash: string;
	deposit?: boolean;
	withdraw?: boolean;
	sent?: boolean;
}
