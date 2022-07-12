import { network, networks } from '@models/network';
import { coinFromSymbol } from '@src/helpers/utilities';
import { MinkeToken } from '@src/model/token';
import { formatUnits } from 'ethers/lib/utils';
import { TokenConverterParams, TokensConverterParams } from './tokenConverter.types';

const convertToken = async ({ source, token, chainId }: TokenConverterParams): Promise<MinkeToken> => {
	const { id, name } = await coinFromSymbol(token.contract_ticker_symbol);
	const matic = chainId === networks.matic.chainId;
	const weth = token.contract_ticker_symbol === 'WETH';
	const symbol = matic && weth ? 'ETH' : token.contract_ticker_symbol;

	switch (source) {
		// covalent
		default:
			return {
				id,
				address: token.contract_address,
				balance: formatUnits(token.balance, token.contract_decimals),
				balanceUSD: token.quote,
				decimals: token.contract_decimals,
				image: token.logo_url,
				name: name || token.contract_name,
				symbol
			};
	}
};

const convertTokens = async ({ source, tokens, chainId }: TokensConverterParams): Promise<MinkeToken[]> => {
	const convertedTokens = [];

	for (let i = 0; i < tokens.length; i += 1) {
		const token = tokens[i];
		// eslint-disable-next-line no-await-in-loop
		const converted = await convertToken({ source, token, chainId });
		convertedTokens.push(converted);
	}
	return convertedTokens;
};

export { convertToken, convertTokens };
