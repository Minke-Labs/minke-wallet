import { Network } from '@models/network';

export interface UseZerionBalancesParams {
	address: string;
}

export interface UseZerionL2BalancesParams {
	address: string;
	network: Network;
}

export interface AddressSocket {
	namespace: string;
	socket: SocketIOClient.Socket;
}

export interface RequestBody {
	scope: string[];
	payload: {
		address: string;
		currency: string;
		portfolio_fields: string;
	};
}

export interface ZerionAsset {
	asset_code: string;
	name: string;
	symbol: string;
	decimals: number;
	implementations: {
		[key: string]: {
			address: string;
			decimals: number;
		};
	};
}

export interface ZerionTokenData {
	payload?: {
		positions?: {
			positions: {
				asset: ZerionAsset;
				quantity: string;
				value: number | null;
				chain: string;
				type: string;
			}[];
		};
	};
}
