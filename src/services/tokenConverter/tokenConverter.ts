import { networks } from '@models/network';
import { MinkeToken } from '@models/types/token.types';
import { formatUnits } from 'ethers/lib/utils';
import { TokenConverterParams, TokensConverterParams } from './tokenConverter.types';

const convertToken = async ({ source, token, chainId }: TokenConverterParams): Promise<MinkeToken> => {
	const matic = chainId === networks.matic.chainId;
	const weth = token.contract_ticker_symbol === 'WETH';
	const symbol = matic && weth ? 'ETH' : token.contract_ticker_symbol;
	const address = matic && symbol === 'MATIC' ? '0x0000000000000000000000000000000000000000' : token.contract_address;

	switch (source) {
		// covalent
		default:
			return {
				address,
				balance: formatUnits(token.balance, token.contract_decimals),
				balanceUSD: token.quote,
				decimals: token.contract_decimals,
				image: token.logo_url,
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
