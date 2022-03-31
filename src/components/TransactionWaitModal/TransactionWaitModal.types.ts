import { ParaswapToken } from '@models/token';

export interface TransactionWaitModalProps {
	onDismiss: () => void;
	fromToken: ParaswapToken;
	toToken: ParaswapToken;
	transactionHash: string;
	deposit?: boolean;
	withdraw?: boolean;
}
