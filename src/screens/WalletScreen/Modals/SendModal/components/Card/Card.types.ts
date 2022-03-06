import { WalletToken } from '@src/model/wallet';

export interface CardProps {
	token: WalletToken;
	onSelected?: (token: WalletToken) => void;
}
