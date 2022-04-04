import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALCHEMY_API_URL_POLYGON_MAINNET, BICONOMY_API_KEY_POLYGON_MAINNET } from '@env';

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
	topUpToken: { symbol: string; name: string };
	transactionTimesEndpoint: boolean;
	wyreSRN: string;
	jsonRpcProvider?: string;
	biconomyAPIKey?: string;
}

export interface Networks {
	mainnet: Network;
	matic: Network;
	mumbai: Network;
	ropsten: Network;
	kovan: Network;
}

export const networks: Networks = {
	mainnet: {
		chainId: 1,
		name: 'Ethereum',
		id: 'mainnet',
		wyreSRN: 'ethereum',
		testnet: false,
		etherscanURL: 'https://etherscan.io/',
		etherscanAPIURL: 'https://api.etherscan.io/',
		etherscanAPIKey: 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N',
		zapperNetwork: 'ethereum',
		nativeToken: { symbol: 'ETH', name: 'Ethereum' },
		topUpToken: { symbol: 'USDC', name: 'USDC' },
		transactionTimesEndpoint: true
	},
	matic: {
		chainId: 137,
		name: 'Polygon',
		id: 'matic',
		wyreSRN: 'matic',
		testnet: false,
		etherscanURL: 'https://polygonscan.com/',
		etherscanAPIURL: 'https://api.polygonscan.com/',
		etherscanAPIKey: 'ETKTPMXNC3VEPFQY9D3UZCS47IGQH7FDS7',
		zapperNetwork: 'polygon',
		nativeToken: { symbol: 'MATIC', name: 'Matic' },
		transactionTimesEndpoint: false,
		jsonRpcProvider: ALCHEMY_API_URL_POLYGON_MAINNET || process.env.ALCHEMY_API_URL_POLYGON_MAINNET,
		biconomyAPIKey: BICONOMY_API_KEY_POLYGON_MAINNET || process.env.BICONOMY_API_KEY_POLYGON_MAINNET,
		topUpToken: { symbol: 'MUSDC', name: 'USDC' }
	},
	mumbai: {
		chainId: 80001,
		name: 'Polygon Test',
		id: 'maticmum',
		wyreSRN: 'matic',
		testnet: true,
		etherscanURL: 'https://mumbai.polygonscan.com/',
		etherscanAPIURL: 'https://api-testnet.polygonscan.com/',
		etherscanAPIKey: 'ETKTPMXNC3VEPFQY9D3UZCS47IGQH7FDS7',
		gasURL: 'https://api.polygonscan.com/',
		zapperNetwork: 'polygon',
		nativeToken: { symbol: 'MATIC', name: 'Matic' },
		topUpToken: { symbol: 'MUSDC', name: 'USDC' },
		transactionTimesEndpoint: false
	},
	ropsten: {
		chainId: 3,
		name: 'Ropsten',
		id: 'ropsten',
		wyreSRN: 'ethereum',
		testnet: true,
		etherscanURL: 'https://ropsten.etherscan.io/',
		etherscanAPIURL: 'https://api-ropsten.etherscan.io/',
		etherscanAPIKey: 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N',
		zapperNetwork: 'ethereum',
		nativeToken: { symbol: 'ETH', name: 'Ethereum' },
		topUpToken: { symbol: 'USDC', name: 'USDC' },
		transactionTimesEndpoint: true
	},
	kovan: {
		chainId: 42,
		name: 'Kovan',
		id: 'kovan',
		wyreSRN: 'ethereum',
		testnet: true,
		etherscanURL: 'https://kovan.etherscan.io/',
		etherscanAPIURL: 'https://api-kovan.etherscan.io/',
		etherscanAPIKey: 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N',
		zapperNetwork: 'ethereum',
		nativeToken: { symbol: 'ETH', name: 'Ethereum' },
		topUpToken: { symbol: 'USDC', name: 'USDC' },
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
