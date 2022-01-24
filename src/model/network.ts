import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Network {
	chainId: number;
	name: string;
	id: string;
	testnet: boolean;
	etherscanURL: string;
	gasURL?: string;
	zapperNetwork: string;
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
		testnet: false,
		etherscanURL: 'https://api.etherscan.io/',
		zapperNetwork: 'ethereum'
	},
	matic: {
		chainId: 137,
		name: 'Polygon',
		id: 'matic',
		testnet: false,
		etherscanURL: 'https://api.polygonscan.com/',
		zapperNetwork: 'polygon'
	},
	mumbai: {
		chainId: 80001,
		name: 'Polygon Test',
		id: 'maticmum',
		testnet: true,
		etherscanURL: 'https://api-testnet.polygonscan.com/',
		gasURL: 'https://api.polygonscan.com/',
		zapperNetwork: 'polygon'
	},
	ropsten: {
		chainId: 3,
		name: 'Ropsten',
		id: 'ropsten',
		testnet: true,
		etherscanURL: 'https://api-ropsten.etherscan.io/',
		zapperNetwork: 'ethereum'
	}
};

export const networkSettingsKey = '@minke:network';
export const defaultNetwork = networks.mumbai;

export const network = async (): Promise<Network> => {
	const id = await AsyncStorage.getItem(networkSettingsKey);
	const selectedNetwork = networks[id as keyof Networks];
	if (id && selectedNetwork) {
		return selectedNetwork;
	}

	return defaultNetwork;
};
