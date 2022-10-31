import { ZERION_API_TOKEN } from '@env';
import io from 'socket.io-client';
import { MinkeToken } from '@models/types/token.types';
import { network } from '@models/network';
import { formatUnits } from 'ethers/lib/utils';
import { AddressSocket, RequestBody, UseZerionBalancesParams, ZerionTokenData } from './useZerionBalances.types';
import { getProvider } from '@models/wallet';

const BASE_URL = 'wss://api-v4.zerion.io/';

const addressSocket = {
	namespace: 'address',
	socket: io(`${BASE_URL}address`, {
		transports: ['websocket'],
		timeout: 60000,
		query: {
			api_token: ZERION_API_TOKEN || process.env.ZERION_API_TOKEN
		}
	})
};

const get = (socketNamespace: AddressSocket, requestBody: RequestBody): Promise<ZerionTokenData> =>
	new Promise((resolve, reject) => {
		const { socket, namespace } = socketNamespace;
		function handleReceive(data: ZerionTokenData) {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			unsubscribe();
			resolve(data);
		}
		const model = requestBody.scope[0];
		function unsubscribe() {
			socket.off(`received ${namespace} ${model}`, handleReceive);
			socket.emit('unsubscribe', requestBody);
		}
		socket.emit('get', requestBody);
		socket.on('connect_error', (error: any) => {
			reject(error);
		});
		socket.on('disconnect', (reason: string) => {
			reject(new Error(reason));
		});
		socket.on(`received ${namespace} ${model}`, handleReceive);
	});

const useZerionBalances = async ({ address }: UseZerionBalancesParams): Promise<MinkeToken[]> => {
	try {
		const { zapperNetwork, nativeToken, id } = await network();
		const { payload }: ZerionTokenData = await get(addressSocket, {
			scope: ['positions'],
			payload: {
				address: address.toLowerCase(),
				currency: 'usd',
				portfolio_fields: 'all'
			}
		});
		let { positions = [] } = payload?.positions || {};
		positions = positions.filter(({ chain, type }) => type === 'asset' && chain === zapperNetwork);
		const promises = positions.map(async ({ asset, quantity, value }) => {
			const { symbol, asset_code: assetCode, name, implementations = {}, price } = asset;
			const { address: tokenAddress = assetCode, decimals = asset.decimals } = implementations[zapperNetwork];
			let balance = formatUnits(quantity, decimals);

			const token = {
				address: tokenAddress || '0x0000000000000000000000000000000000000000',
				symbol,
				decimals,
				balance,
				balanceUSD: value || 0,
				name
			};

			if (symbol === nativeToken.symbol) {
				const provider = await getProvider(id);
				const blockchainBalance = await provider.getBalance(address);
				balance = formatUnits(blockchainBalance, decimals);
				const balanceUSD = Number(balance) * price.value;
				return { ...token, ...{ balance, balanceUSD } };
			}
			return token;
		});

		return await Promise.all(promises);
	} catch {
		return [];
	}
};

export default useZerionBalances;
