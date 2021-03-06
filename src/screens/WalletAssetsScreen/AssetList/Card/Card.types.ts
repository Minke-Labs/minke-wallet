import { TokenType } from '@styles';

export interface CardProps {
	onPress: () => void;
	coinName: string;
	coinSymbol: TokenType;
	walletBalance: string;
	walletBalanceUsd: number;
	interest?: string;
}
