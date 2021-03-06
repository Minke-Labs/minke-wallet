import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	ALCHEMY_API_URL_POLYGON_MAINNET,
	BICONOMY_API_KEY_POLYGON_MAINNET,
	ALCHEMY_API_KEY_ETHEREUM,
	ALCHEMY_API_KEY_MATIC,
	ALCHEMY_API_KEY_ROPSTEN,
	ALCHEMY_API_KEY_KOVAN
} from '@env';

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
	alchemyAPIKey: string;
	jsonRpcProvider?: string;
	biconomyAPIKey?: string;
	apiUrl0x?: string;
	mStable?: {
		depositContract: string;
		withdrawContract: string;
		mAsset: string;
		saveAsset: string;
		vault: string;
	};
	coingeckoPlatform: string;
}

export interface Networks {
	mainnet: Network;
	matic: Network;
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
		transactionTimesEndpoint: true,
		apiUrl0x: 'https://api.0x.org/',
		alchemyAPIKey: (ALCHEMY_API_KEY_ETHEREUM || process.env.ALCHEMY_API_KEY_ETHEREUM)!,
		coingeckoPlatform: 'ethereum'
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
		topUpToken: { symbol: 'MUSDC', name: 'USDC' },
		apiUrl0x: 'https://polygon.api.0x.org/',
		alchemyAPIKey: (ALCHEMY_API_KEY_MATIC || process.env.ALCHEMY_API_KEY_MATIC)!,
		mStable: {
			depositContract: '0x89252e32e98D467C6Ae3e2E6a9942bA3033f938a',
			withdrawContract: '0x89252e32e98D467C6Ae3e2E6a9942bA3033f938a',
			mAsset: '0xE840B73E5287865EEc17d250bFb1536704B43B21',
			saveAsset: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
			vault: '0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29'
		},
		coingeckoPlatform: 'polygon-pos'
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
		transactionTimesEndpoint: true,
		alchemyAPIKey: (ALCHEMY_API_KEY_ROPSTEN || process.env.ALCHEMY_API_KEY_ROPSTEN)!,
		coingeckoPlatform: 'ethereum'
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
		transactionTimesEndpoint: true,
		alchemyAPIKey: (ALCHEMY_API_KEY_KOVAN || process.env.ALCHEMY_API_KEY_KOVAN)!,
		coingeckoPlatform: 'ethereum'
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
