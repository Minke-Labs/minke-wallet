import { ParaswapToken } from '@models/token';

export interface TransactionWaitModalProps {
	onDismiss: () => void;
	fromToken: ParaswapToken;
	toToken?: ParaswapToken | undefined;
	transactionHash: string;
	deposit?: boolean;
	withdraw?: boolean;
	sent?: boolean;
}
