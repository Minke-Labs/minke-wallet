import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Network {
	chainId: number;
	name: string;
	id: string;
	testnet: boolean;
	etherscanURL: string;
	etherscanAPIURL: string;
	etherscanAPIKey: string;
	gasURL?: string;
	zapperNetwork: string;
	nativeToken: { symbol: string; name: string };
	transactionTimesEndpoint: boolean;
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
		etherscanURL: 'https://etherscan.io/',
		etherscanAPIURL: 'https://api.etherscan.io/',
		etherscanAPIKey: 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N',
		zapperNetwork: 'ethereum',
		nativeToken: { symbol: 'ETH', name: 'Ethereum' },
		transactionTimesEndpoint: true
	},
	matic: {
		chainId: 137,
		name: 'Polygon',
		id: 'matic',
		testnet: false,
		etherscanURL: 'https://polygonscan.com/',
		etherscanAPIURL: 'https://api.polygonscan.com/',
		etherscanAPIKey: 'ETKTPMXNC3VEPFQY9D3UZCS47IGQH7FDS7',
		zapperNetwork: 'polygon',
		nativeToken: { symbol: 'MATIC', name: 'Matic' },
		transactionTimesEndpoint: false
	},
	mumbai: {
		chainId: 80001,
		name: 'Polygon Test',
		id: 'maticmum',
		testnet: true,
		etherscanURL: 'https://mumbai.polygonscan.com/',
		etherscanAPIURL: 'https://api-testnet.polygonscan.com/',
		etherscanAPIKey: 'ETKTPMXNC3VEPFQY9D3UZCS47IGQH7FDS7',
		gasURL: 'https://api.polygonscan.com/',
		zapperNetwork: 'polygon',
		nativeToken: { symbol: 'MATIC', name: 'Matic' },
		transactionTimesEndpoint: false
	},
	ropsten: {
		chainId: 3,
		name: 'Ropsten',
		id: 'ropsten',
		testnet: true,
		etherscanURL: 'https://ropsten.etherscan.io/',
		etherscanAPIURL: 'https://api-ropsten.etherscan.io/',
		etherscanAPIKey: 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N',
		zapperNetwork: 'ethereum',
		nativeToken: { symbol: 'ETH', name: 'Ethereum' },
		transactionTimesEndpoint: true
	}
};

export const networkSettingsKey = '@minke:network';
export const defaultNetwork = networks.matic;

export const network = async (): Promise<Network> => {
	const id = await AsyncStorage.getItem(networkSettingsKey);
	const selectedNetwork = networks[id as keyof Networks];
	if (id && selectedNetwork) {
		return selectedNetwork;
	}

	return defaultNetwork;
};
