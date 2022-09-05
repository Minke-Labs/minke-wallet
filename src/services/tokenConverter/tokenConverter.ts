import { networks } from '@models/network';
import { coinFromSymbol } from '@src/helpers/utilities';
import { MinkeToken } from '@models/types/token.types';
import { formatUnits } from 'ethers/lib/utils';
import { TokenConverterParams, TokensConverterParams } from './tokenConverter.types';

const convertToken = async ({ source, token, chainId }: TokenConverterParams): Promise<MinkeToken> => {
	const data = await coinFromSymbol(token.contract_ticker_symbol);
	const { id } = data;
	let { name } = data;
	const matic = chainId === networks.matic.chainId;
	const weth = token.contract_ticker_symbol === 'WETH';
	const symbol = matic && weth ? 'ETH' : token.contract_ticker_symbol;
	name = name || token.contract_name;
	if (token.contract_address.toLowerCase() === '0xb5c064f955d8e7f38fe0460c556a72987494ee17') {
		name = 'QuickSwap';
	}

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
				name,
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
