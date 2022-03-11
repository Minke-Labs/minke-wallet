import { WalletToken } from '@models/wallet';

export interface CardProps {
	token: WalletToken;
	onSelected?: (token: WalletToken) => void;
}
