import { MinkeToken } from '@models/types/token.types';
import { TokenType } from '@styles';

export interface TokenProps {
	token: MinkeToken;
	size: number;
	outline?: boolean;
	glow?: boolean;
}

export interface ContentProps {
	name: TokenType;
	size: number;
	tokenColor: string;
}
