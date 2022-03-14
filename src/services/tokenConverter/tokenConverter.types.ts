import { CovalentToken } from '@models/token';

export interface TokenConverterParams {
	source: 'covalent';
	token: CovalentToken;
}

export interface TokensConverterParams {
	source: 'covalent';
	tokens: CovalentToken[];
}
