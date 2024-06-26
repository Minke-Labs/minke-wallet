import {
	ALCHEMY_API_KEY_ETHEREUM,
	ALCHEMY_API_KEY_MATIC,
	ALCHEMY_API_URL_POLYGON_MAINNET,
	BICONOMY_API_KEY_POLYGON_MAINNET,
	QUICK_NODE_API_URL_BSC_MAINNET
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MinkeToken, TopupToken } from './types/token.types';

export interface Network {
	chainId: number;
	name: string;
	shortName?: string;
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
	eip1559: boolean;
}

export interface Networks {
	mainnet: Network;
	matic: Network;

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
				suggestedBuyAmount: 100,
				chainId: 1
			},
			{
				symbol: 'ETH',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 0.1,
				chainId: 1
			},
			{
				symbol: 'USDT',
				address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
				decimals: 6,
				suggestedBuyAmount: 100,
				chainId: 1
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
				symbol: 'SHIB',
				address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'UNI',
				address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'SDAO',
				address: '0x993864e43caa7f7f12953ad6feb1d1ca635b875f',
				decimals: 18,
				name: 'SingularityDAO',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'LPT',
				address: '0x58b6a8a3302369daec383334672404ee733ab239',
				decimals: 18,
				name: 'Livepeer',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'BAT',
				address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
				decimals: 18,
				name: 'Basic Attention',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'COMP',
				address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
				decimals: 18,
				name: 'Compound',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'ZRX',
				address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
				decimals: 18,
				name: '0x',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'ENJ',
				address: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
				decimals: 18,
				name: 'Enjin Coin',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'SAND',
				address: '0x3845badade8e6dff049820680d1f14bd3903a5d0',
				decimals: 18,
				name: 'The Sandbox',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'GALA',
				address: '0x15d4c048f83bd7e37d49ea4c83a07267ec4203da',
				decimals: 8,
				name: 'Gala',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'CHZ',
				address: '0x3506424f91fd33084466f402d5d97f05f8e3b4af',
				decimals: 18,
				name: 'Chiliz',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'LRC',
				address: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
				decimals: 18,
				name: 'Loopring',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'ELON',
				address: '0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3',
				decimals: 18,
				name: 'Dogelon Mars',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'GRT',
				address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
				decimals: 18,
				name: 'The Graph',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'SUSHI',
				address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
				decimals: 18,
				name: 'Sushi',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: '1INCH',
				address: '0x111111111117dc0aa78b770fa6a738034120c302',
				decimals: 18,
				name: '1inch',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'APE',
				address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
				decimals: 18,
				name: 'ApeCoin',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'SNX',
				address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
				decimals: 18,
				name: 'Synthetix Network',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'MKR',
				address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
				decimals: 18,
				name: 'Maker',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'KNC',
				address: '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202',
				decimals: 18,
				name: 'Kyber Network Crystal',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'FLOKI',
				address: '0xcf0c122c6b73ff809c693db761e7baebe62b6a2e',
				decimals: 9,
				name: 'FLOKI',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'ENS',
				address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
				decimals: 18,
				name: 'Ethereum Name Service',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'BAL',
				address: '0xba100000625a3754423978a60c9317c58a424e3d',
				decimals: 18,
				name: 'Balancer',
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'WBTC',
				address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
				decimals: 8,
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},

			{
				symbol: 'MATIC',
				address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			},
			{
				symbol: 'ETH',
				address: '0x0000000000000000000000000000000000000000',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 1
			}
		],
		eip1559: true
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
				address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
				decimals: 6,
				suggestedBuyAmount: 100,
				chainId: 137
			},
			{
				symbol: 'MATIC',
				moonpaySymbol: 'MATIC_POLYGON',
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				decimals: 18,
				suggestedBuyAmount: 100,
				chainId: 137
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
				symbol: 'QUICK',
				address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17',
				decimals: 18,
				id: 'quickswap',
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'avalanche-2',
				symbol: 'AVAX',
				name: 'Avalanche',
				address: '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'uniswap',
				symbol: 'UNI',
				name: 'Uniswap',
				address: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'chainlink',
				symbol: 'LINK',
				name: 'Chainlink',
				address: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'decentraland',
				symbol: 'MANA',
				name: 'Decentraland',
				address: '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'lido-dao',
				symbol: 'LDO',
				name: 'Lido DAO',
				address: '0xc3c7d422809852031b44ab29eec9f1eff2a58756',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'the-sandbox',
				symbol: 'SAND',
				name: 'The Sandbox',
				address: '0xbbba073c31bf03b8acf7c28ef0738decf3695683',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'sushi',
				symbol: 'SUSHI',
				name: 'Sushi',
				address: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'pooltogether',
				symbol: 'POOL',
				name: 'PoolTogether',
				address: '0x25788a1a171ec66da6502f9975a15b609ff54cf6',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'sphere-finance',
				symbol: 'SPHERE',
				name: 'Sphere Finance',
				address: '0x62f594339830b90ae4c084ae7d223ffafd9658a7',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'dogelon-mars',
				symbol: 'ELON',
				name: 'Dogelon Mars',
				address: '0xe0339c80ffde91f3e20494df88d4206d86024cdf',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'klima-dao',
				symbol: 'KLIMA',
				name: 'Klima DAO',
				address: '0x4e78011ce80ee02d2c3e649fb657e45898257815',
				decimals: 9,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'zed-run',
				symbol: 'ZED',
				name: 'ZED RUN',
				address: '0x5eC03C1f7fA7FF05EC476d19e34A22eDDb48ACdc',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'gains-network',
				symbol: 'GNS',
				name: 'Gains Network',
				address: '0xE5417Af564e4bFDA1c483642db72007871397896',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'havven',
				symbol: 'SNX',
				name: 'Synthetix Network',
				address: '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'defipulse-index',
				symbol: 'DPI',
				name: 'DeFi Pulse Index',
				address: '0x85955046df4668e1dd369d2de9f3aeb98dd2a369',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				id: 'wrapped-bitcoin',
				symbol: 'WBTC',
				name: 'Wrapped Bitcoin',
				address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
				decimals: 8,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				symbol: 'WETH',
				address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			},
			{
				symbol: 'MATIC',
				address: '0x0000000000000000000000000000000000000000',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 137
			}
		],
		eip1559: true
	},
	'binance-smart-chain': {
		chainId: 56,
		name: 'Binance Smart Chain',
		shortName: 'BSC',
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
		topUpTokens: [
			{
				symbol: 'BUSD',
				moonpaySymbol: 'BUSD_BSC',
				address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
				decimals: 18,
				suggestedBuyAmount: 100,
				chainId: 56
			},
			{
				symbol: 'BNB',
				moonpaySymbol: 'BNB_BSC',
				address: '0x0000000000000000000000000000000000000000',
				decimals: 18,
				suggestedBuyAmount: 0.5,
				chainId: 56
			}
		],
		apiUrl0x: 'https://bsc.api.0x.org/',
		alchemyAPIKey: '',
		aave: {
			depositContract: ''
		},
		coingeckoPlatform: 'binance-smart-chain',
		suggestedTokens: [
			{
				id: 'axie-infinity',
				symbol: 'AXS',
				name: 'Axie Infinity',
				address: '0x715d400f88c167884bbcc41c5fea407ed4d2f8a0',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'ALPACA',
				address: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
				decimals: 18,
				name: 'Alpaca Finance',
				id: 'alpaca-finance',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				id: 'winklink-bsc',
				symbol: 'WIN',
				name: 'WINkLink BSC',
				address: '0xaef0d72a118ce24fee3cd1d43d383897d05b4e99',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: '1INCH',
				address: '0x111111111117dc0aa78b770fa6a738034120c302',
				decimals: 18,
				name: '1inch',
				id: '1inch',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'LINK',
				address: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
				decimals: 18,
				name: 'Chainlink',
				id: 'chainlink',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				id: 'floki',
				symbol: 'FLOKI',
				name: 'FLOKI',
				address: '0xcf0c122c6b73ff809c693db761e7baebe62b6a2e',
				decimals: 9,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'XTZ',
				address: '0x16939ef78684453bfdfb47825f8a5f714f12623a',
				decimals: 18,
				name: 'Tezos Token',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'SNX',
				name: 'Synthetix Network Token',
				address: '0x9ac983826058b8a9c7aa1c9171441191232e8404',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				address: '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1',
				decimals: 8,
				name: 'STEPN',
				symbol: 'GMT',
				id: 'stepn',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'COMP',
				address: '0x52ce071bd9b1c4b00a0b92d298c512478cad67e8',
				decimals: 18,
				name: 'Compound',
				id: 'compound-governance-token',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				address: '0x101d82428437127bf1608f699cd651e6abf9766e',
				decimals: 18,
				name: 'Basic Attention Token',
				symbol: 'BAT',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				address: '0x1fa4a73a3f0133f0025378af00236f3abdee5d63',
				decimals: 18,
				name: 'Wrapped Near',
				symbol: 'WNEAR',
				id: 'wrapped-near',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'DOT',
				address: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
				decimals: 18,
				name: 'Polkadot',
				id: 'binance-peg-polkadot',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				id: 'binance-peg-avalanche',
				symbol: 'AVAX',
				name: 'Avalanche',
				address: '0x1ce0c2827e2ef14d5c4f29a091d735a204794041',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'ATOM',
				address: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
				decimals: 18,
				name: 'Cosmos Hub',
				id: 'cosmos',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				address: '0xa64455a4553c9034236734faddaddbb64ace4cc7',
				decimals: 8,
				name: 'Santos FC Fan Token',
				symbol: 'SANTOS',
				id: 'santos-fc-fan-token',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				address: '0xc748673057861a797275cd8a068abb95a902e8de',
				decimals: 9,
				name: 'Baby Doge Coin',
				symbol: 'BABYDOGE',
				id: 'baby-doge-coin',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'CAKE',
				address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
				decimals: 18,
				name: 'PancakeSwap',
				id: 'pancakeswap-token',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'XRP',
				address: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe',
				decimals: 18,
				name: 'XRP',
				id: 'binance-peg-xrp',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'ADA',
				address: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
				decimals: 18,
				name: 'Cardano',
				id: 'binance-peg-cardano',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'DOGE',
				address: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
				decimals: 8,
				name: 'Dogecoin',
				id: 'binance-peg-dogecoin',
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'BTCB',
				address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'ETH',
				address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			},
			{
				symbol: 'BNB',
				address: '0x0000000000000000000000000000000000000000',
				decimals: 18,
				balance: '0',
				balanceUSD: 0,
				chainId: 56
			}
		],
		eip1559: false
	}
};

export const networkSettingsKey = '@minke:network';
export const defaultNetwork = networks.matic;

export const selectedNetwork = async (): Promise<Network> => {
	const id = await AsyncStorage.getItem(networkSettingsKey);
	const nw = networks[id as keyof Networks];

	if (id && nw) {
		return nw;
	}
	return defaultNetwork;
};
