import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	ALCHEMY_API_URL_POLYGON_MAINNET,
	BICONOMY_API_KEY_POLYGON_MAINNET,
	ALCHEMY_API_KEY_ETHEREUM,
	ALCHEMY_API_KEY_KOVAN,
	ALCHEMY_API_KEY_MATIC,
	ALCHEMY_API_KEY_GOERLI,
	QUICK_NODE_API_URL_BSC_MAINNET,
	BICONOMY_API_KEY_BSC_MAINNET
} from '@env';
import { MinkeToken, TopupToken } from './types/token.types';

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
	topUpTokens: TopupToken[];
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
	aave: {
		depositContract: string;
	};
	coingeckoPlatform: string;
	suggestedTokens: MinkeToken[];
}

export interface Networks {
	mainnet: Network;
	matic: Network;
	kovan: Network;
	goerli: Network;
	'binance-smart-chain': Network;
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
		topUpTokens: [
			{
				symbol: 'USDC',
				address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
				decimals: 6,
				suggestedBuyAmount: 100
			},
			{
				symbol: 'ETH',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 0.1
			},
			{
				symbol: 'USDT',
				address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
				decimals: 6,
				suggestedBuyAmount: 100
			}
		],
		transactionTimesEndpoint: true,
		apiUrl0x: 'https://api.0x.org/',
		alchemyAPIKey: (ALCHEMY_API_KEY_ETHEREUM || process.env.ALCHEMY_API_KEY_ETHEREUM)!,
		coingeckoPlatform: 'ethereum',
		aave: {
			depositContract: '0x411F4d453d530a1daDb9bA153C93448b9e83c592'
		},
		suggestedTokens: [
			{
				symbol: 'ETH',
				address: '0x0000000000000000000000000000000000000000',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'WBTC',
				address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
				decimals: 8,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'SHIB',
				address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'MATIC',
				address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'UNI',
				address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			}
		]
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
		topUpTokens: [
			{
				symbol: 'USDC',
				moonpaySymbol: 'USDC_POLYGON',
				wyreSymbol: 'MUSDC',
				address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
				decimals: 6,
				suggestedBuyAmount: 100
			},
			{
				symbol: 'MATIC',
				moonpaySymbol: 'MATIC_POLYGON',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 100
			}
		],
		apiUrl0x: 'https://polygon.api.0x.org/',
		alchemyAPIKey: (ALCHEMY_API_KEY_MATIC || process.env.ALCHEMY_API_KEY_MATIC)!,
		mStable: {
			depositContract: '0x89252e32e98D467C6Ae3e2E6a9942bA3033f938a',
			withdrawContract: '0x89252e32e98D467C6Ae3e2E6a9942bA3033f938a',
			mAsset: '0xE840B73E5287865EEc17d250bFb1536704B43B21',
			saveAsset: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
			vault: '0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29'
		},
		aave: {
			depositContract: '0x467ebEE3755455A5F2bE81ca50b738D7a375F56a'
		},
		coingeckoPlatform: 'polygon-pos',
		suggestedTokens: [
			{
				symbol: 'WETH',
				address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'MATIC',
				address: '0x0000000000000000000000000000000000000000',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'MTA',
				address: '0xF501dd45a1198C2E1b5aEF5314A68B9006D842E0',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'QUICK',
				address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17',
				decimals: 18,
				id: 'quickswap',
				balance: '0',
				balanceUSD: 0
			},
			{
				symbol: 'PolyDoge',
				address: '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472',
				decimals: 18,
				balance: '0',
				balanceUSD: 0
			}
		]
	},
	'binance-smart-chain': {
		chainId: 56,
		name: 'Binance Smart Chain',
		id: 'binance-smart-chain',
		wyreSRN: '',
		testnet: false,
		etherscanURL: 'https://bscscan.com/',
		etherscanAPIURL: 'https://api.bscscan.com/',
		etherscanAPIKey: 'T4IR944AI2CXD1RNU14CAPGQR3R9EV6NYK',
		zapperNetwork: 'binance-smart-chain',
		nativeToken: { symbol: 'BNB', name: 'BNB' },
		transactionTimesEndpoint: false,
		jsonRpcProvider: QUICK_NODE_API_URL_BSC_MAINNET || process.env.QUICK_NODE_API_URL_BSC_MAINNET,
		biconomyAPIKey: BICONOMY_API_KEY_BSC_MAINNET || process.env.BICONOMY_API_KEY_BSC_MAINNET,
		topUpTokens: [
			{
				symbol: 'BNB',
				moonpaySymbol: 'BNB_BSC',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 0.5
			},
			{
				symbol: 'BUSD',
				moonpaySymbol: 'BUSD_BSC',
				address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
				decimals: 6,
				suggestedBuyAmount: 100
			}
		],
		apiUrl0x: 'https://bsc.api.0x.org/',
		alchemyAPIKey: '',
		aave: {
			depositContract: ''
		},
		coingeckoPlatform: 'binance-smart-chain',
		suggestedTokens: []
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
		topUpTokens: [
			{
				symbol: 'ETH',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 0.1
			}
		],
		transactionTimesEndpoint: true,
		alchemyAPIKey: (ALCHEMY_API_KEY_KOVAN || process.env.ALCHEMY_API_KEY_KOVAN)!,
		coingeckoPlatform: 'ethereum',
		aave: {
			depositContract: ''
		},
		suggestedTokens: []
	},
	goerli: {
		chainId: 5,
		name: 'Goerli',
		id: 'goerli',
		wyreSRN: 'ethereum',
		testnet: true,
		etherscanURL: 'https://goerli.etherscan.io/',
		etherscanAPIURL: 'https://api-goerli.etherscan.io/',
		etherscanAPIKey: 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N',
		zapperNetwork: 'ethereum',
		nativeToken: { symbol: 'ETH', name: 'Ethereum' },
		topUpTokens: [
			{
				symbol: 'USDC',
				address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
				decimals: 6,
				suggestedBuyAmount: 100
			},
			{
				symbol: 'ETH',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 0.1
			}
		],
		transactionTimesEndpoint: true,
		alchemyAPIKey: (ALCHEMY_API_KEY_GOERLI || process.env.ALCHEMY_API_KEY_GOERLI)!,
		coingeckoPlatform: 'ethereum',
		aave: {
			depositContract: ''
		},
		suggestedTokens: []
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
