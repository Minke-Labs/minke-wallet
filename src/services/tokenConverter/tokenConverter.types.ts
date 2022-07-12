import { CovalentToken } from '@models/token';

export interface TokenConverterParams {
	source: 'covalent';
	token: CovalentToken;
	chainId: number;
}

export interface TokensConverterParams {
	source: 'covalent';
	tokens: CovalentToken[];
	chainId: number;
}
