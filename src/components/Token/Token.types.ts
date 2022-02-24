import { TokenType } from '@styles';

export interface TokenProps {
	name: TokenType;
	size: number;
	outline?: boolean;
}

export interface ContentProps {
	name: TokenType;
	size: number;
	tokenColor: string;
}
