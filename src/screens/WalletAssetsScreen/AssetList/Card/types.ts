import { TokenType } from '@styles';

export interface CardProps {
	onPress: () => void;
	coinName: string;
	coinSymbol: TokenType;
	walletBalance: number;
	walletBalanceUsd: number;
	interest?: string;
}
