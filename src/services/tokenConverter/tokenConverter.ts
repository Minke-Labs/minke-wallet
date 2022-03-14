import { coinFromSymbol } from '@src/helpers/utilities';
import { MinkeToken } from '@src/model/token';
import { formatUnits } from 'ethers/lib/utils';
import { TokenConverterParams, TokensConverterParams } from './tokenConverter.types';

const convertToken = ({ source, token }: TokenConverterParams): MinkeToken => {
	const { id, name } = coinFromSymbol(token.contract_ticker_symbol);

	switch (source) {
		// covalent
		default:
			return {
				id,
				address: token.contract_address,
				balance: Number(formatUnits(token.balance, token.contract_decimals)),
				balanceUSD: token.quote,
				decimals: token.contract_decimals,
				image: token.logo_url,
				name: name || token.contract_name,
				symbol: token.contract_ticker_symbol
			};
	}
};

const convertTokens = ({ source, tokens }: TokensConverterParams): MinkeToken[] =>
	tokens.map((token) => convertToken({ source, token })).filter((token) => token.balanceUSD > 0);

export { convertToken, convertTokens };
