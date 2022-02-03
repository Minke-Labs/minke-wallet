import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Network {
	chainId: number;
	name: string;
	id: string;
	testnet: boolean;
	etherscanURL: string;
	etherscanAPIURL: string;
	etherscanAPIKey?: string;
	gasURL?: string;
	zapperNetwork: string;
	supportedTokenList?: {
		[key: string]: string;
	};
	nativeTokenSymbol: string;
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
		zapperNetwork: 'ethereum',
		supportedTokenList: {
			dai: '0x6b175474e89094c44da98b954eedeac495271d0f'
		},
		nativeTokenSymbol: 'ETH'
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
		supportedTokenList: {
			dai: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
		},
		nativeTokenSymbol: 'MATIC'
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
		supportedTokenList: {
			dai: '0xd393b1e02da9831ff419e22ea105aae4c47e1253'
		},
		nativeTokenSymbol: 'MATIC'
	},
	ropsten: {
		chainId: 3,
		name: 'Ropsten',
		id: 'ropsten',
		testnet: true,
		etherscanURL: 'https://ropsten.etherscan.io/',
		etherscanAPIURL: 'https://api-ropsten.etherscan.io/',
		zapperNetwork: 'ethereum',
		supportedTokenList: {
			dai: '0xad6d458402f60fd3bd25163575031acdce07538d'
		},
		nativeTokenSymbol: 'ETH'
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
