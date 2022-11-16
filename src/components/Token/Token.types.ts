import { Network } from '@models/network';
import { MinkeToken } from '@models/types/token.types';
import { TokenType } from '@styles';

export interface TokenProps {
	token: MinkeToken;
	size: number;
	outline?: boolean;
	glow?: boolean;
	showNetworkIcon?: boolean;
}

export interface ContentProps {
	name: TokenType;
	size: number;
	tokenColor: string;
	network: Network;
}

export interface TokenImageContentProps {
	name: TokenType;
	size: number;
	tokenColor: string;
}
