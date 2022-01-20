export interface Network {
	chainId: number;
	name: string;
	id: string;
	testnet: boolean;
}

export interface Networks {
	mainnet: Network;
	matic: Network;
	mumbai: Network;
	ropsten: Network;
}

export const networks: Networks = {
	mainnet: {
		chainId: 1,
		name: 'Ethereum',
		id: 'mainnet',
		testnet: false
	},
	matic: {
		chainId: 137,
		name: 'Polygon',
		id: 'matic',
		testnet: false
	},
	mumbai: {
		chainId: 80001,
		name: 'Polygon Test',
		id: 'maticmum',
		testnet: true
	},
	ropsten: {
		chainId: 3,
		name: 'Ropsten',
		id: 'ropsten',
		testnet: true
	}
};

export const defaultNetwork = networks.mumbai;
export const network = networks.mumbai;
