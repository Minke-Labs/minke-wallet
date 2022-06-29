import { MinkeToken } from '@models/token';

export interface TransactionWaitModalProps {
	onDismiss: () => void;
	fromToken: MinkeToken;
	toToken?: MinkeToken | undefined;
	transactionHash: string;
	deposit?: boolean;
	withdraw?: boolean;
	sent?: boolean;
}
