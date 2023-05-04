import { formatUnits } from 'ethers/lib/utils';

import { ZERION_API_TOKEN } from '@env';
import { networks } from '@models/network';
import { MinkeToken } from '@models/types/token.types';
import { getProvider } from '@models/wallet';

import {
	Implementation, UseZerionBalancesParams, ZerionTokenData
} from './useZerionBalances.types';

const useZerionBalances = async ({ address }: UseZerionBalancesParams): Promise<MinkeToken[]> => {
	const chains = Object.values(networks).map((n) => n.zapperNetwork);
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: `Basic ${Buffer.from(
				`${ZERION_API_TOKEN || process.env.ZERION_API_TOKEN}:`,
				'binary'
			).toString('base64')}`
		}
	};

	const response = await fetch(
		`https://api.zerion.io/v1/wallets/${address}/positions/?currency=usd&sort=value`,
		options
	);
	const { data = [] }: ZerionTokenData = await response.json();
	const positions = data.filter(({ relationships }) => chains.includes(relationships.chain.data.id));

	const promises = positions.map(async (asset) => {
		const { relationships, attributes } = asset;
		const { quantity, fungible_info: fungibleInfo, value, price } = attributes;
		const { implementations = [], name, symbol } = fungibleInfo;
		const chain = relationships.chain.data.id;
		const implementation = implementations.find(({ chain_id }) => chain_id === chain) || ({} as Implementation);
		const { address: tokenAddress, decimals = quantity.decimals } = implementation;
		const tokenNetwork = Object.values(networks).find(({ zapperNetwork }) => chain === zapperNetwork);
		let balance = quantity.numeric;

		const { nativeToken, id, chainId } = tokenNetwork;

		const token = {
			address: tokenAddress || '0x0000000000000000000000000000000000000000',
			symbol,
			decimals,
			chainId,
			balance,
			balanceUSD: value || 0,
			name: name.replace('Binance-Peg ', '')
		};

		if (symbol === nativeToken.symbol) {
			const provider = getProvider(id);
			const blockchainBalance = await provider.getBalance(address);
			balance = formatUnits(blockchainBalance, decimals);
			const balanceUSD = Number(balance) * price;
			const newName = symbol === 'MATIC' ? 'Polygon' : name;
			return { ...token, ...{ balance, balanceUSD, name: newName } };
		}

		return token;
	});

	return Promise.all(promises);
};

export default useZerionBalances;
