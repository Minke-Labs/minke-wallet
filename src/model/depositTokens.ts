import { BigNumber, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { partition } from 'lodash';
import { searchCoinData } from '@helpers/utilities';
import { usdCoin } from './deposit';
import { networks } from './network';
import { MinkeToken } from './types/token.types';
import { DepositableToken, DepositTokens, Stables } from './types/depositTokens.types';
import { erc20abi, getProvider } from './wallet';

const { mainnet, matic, 'binance-smart-chain': bsc, goerli } = networks;
export const stables: Stables = {
	matic: {
		'USDC.e': {
			address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
			decimals: 6,
			symbol: 'USDC',
			chainId: matic.chainId
		},
		USDC: {
			address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
			decimals: 6,
			symbol: 'USDC',
			chainId: matic.chainId
		},
		DAI: {
			address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
			decimals: 18,
			symbol: 'DAI',
			chainId: matic.chainId
		},
		USDT: {
			address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
			decimals: 6,
			symbol: 'USDT',
			chainId: matic.chainId
		},
		imUSD: {
			address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
			decimals: 18,
			symbol: 'imUSD',
			chainId: matic.chainId
		}
	},
	mainnet: {
		USDC: {
			address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
			decimals: 6,
			symbol: 'USDC',
			chainId: mainnet.chainId
		},
		DAI: {
			address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
			decimals: 18,
			symbol: 'DAI',
			chainId: mainnet.chainId
		},
		USDT: {
			address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
			decimals: 6,
			symbol: 'USDT',
			chainId: mainnet.chainId
		},
		imUSD: {
			address: '0x30647a72Dc82d7Fbb1123EA74716aB8A317Eac19',
			decimals: 18,
			symbol: 'imUSD',
			chainId: mainnet.chainId
		}
	},
	'binance-smart-chain': {
		BUSD: {
			symbol: 'BUSD',
			address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
			decimals: 18,
			chainId: bsc.chainId
		},
		USDC: {
			symbol: 'USDC',
			decimals: 18,
			address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
			chainId: bsc.chainId
		},
		DAI: {
			symbol: 'DAI',
			decimals: 18,
			address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
			chainId: bsc.chainId
		},
		USDT: {
			symbol: 'USDT',
			decimals: 18,
			address: '0x55d398326f99059ff775485246999027b3197955',
			chainId: bsc.chainId
		}
	}
	// goerli: {
	// 	USDC: {
	// 		address: '0x179c54e1fEa2Cd75de3Dc5fa61869B93d8C5b317',
	// 		decimals: 6,
	// 		symbol: 'USDC',
	// 		chainId: goerli.chainId
	// 	}
	// }
};

const depositTokens: DepositTokens = {
	matic: {
		aave: [
			{
				...stables.matic.USDC,
				interestBearingToken: {
					symbol: 'amUSDC',
					address: '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F',
					decimals: 6,
					source: 'AAVE'
				}
			},
			{
				...stables.matic.DAI,
				interestBearingToken: {
					symbol: 'amDAI',
					address: '0x27F8D03b3a2196956ED754baDc28D73be8830A6e',
					decimals: 18,
					source: 'AAVE'
				}
			},
			{
				...stables.matic.USDT,
				interestBearingToken: {
					symbol: 'amUSDT',
					address: '0x60D55F02A771d515e077c9C2403a1ef324885CeC',
					decimals: 6,
					source: 'AAVE'
				}
			}
		],
		mstable: [
			{
				...stables.matic.imUSD,
				interestBearingToken: {
					exchangeRateContract: true,
					convertToDefaultUSD: true,
					symbol: 'mv-imUSD',
					address: '0x6265b466d9E6368057ed631caEE9C9f84c1A2Ad3',
					decimals: 18,
					source: 'mStable'
				}
			}
		]
	},
	mainnet: {
		aave: [
			{
				...stables.mainnet.USDC,
				interestBearingToken: {
					symbol: 'aUSDC',
					address: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
					decimals: 6,
					source: 'AAVE'
				}
			},
			{
				...stables.mainnet.DAI,
				interestBearingToken: {
					symbol: 'aDAI',
					address: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
					decimals: 18,
					source: 'AAVE'
				}
			},
			{
				...stables.mainnet.USDT,
				interestBearingToken: {
					symbol: 'aUSDT',
					address: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
					decimals: 6,
					source: 'AAVE'
				}
			}
		],
		mstable: [
			{
				...stables.mainnet.imUSD,
				interestBearingToken: {
					exchangeRateContract: true,
					convertToDefaultUSD: true,
					symbol: 'v-imUSD',
					address: '0x78BefCa7de27d07DC6e71da295Cc2946681A6c7B',
					decimals: 18,
					source: 'mStable'
				}
			}
		]
	}
};

export const getDepositToken = (id: string, symbol: string, protocol: string): DepositableToken => {
	const depositable = depositTokens[id] || {};
	const values = depositable[protocol];
	return values.find((t) => symbol.toLowerCase() === t.symbol.toLowerCase()) || values[0];
};

const fetchInterestBearingTokens = async (wallet: string): Promise<MinkeToken[]> => {
	const networkPromises = Object.values(networks).map(async (network) => {
		const { id: networkId, chainId } = network;
		const provider = getProvider(networkId);
		const tokens = Object.values(depositTokens[networkId] || []).flat();
		if (tokens.length > 0) {
			const promises = tokens.map(
				async ({ address, decimals, symbol, interestBearingToken }): Promise<MinkeToken> => {
					const {
						address: interestBearingAddress,
						symbol: interestBearingSymbol,
						decimals: interestBearingDecimals,
						exchangeRateContract,
						convertToDefaultUSD,
						source
					} = interestBearingToken;
					const token = new Contract(interestBearingAddress, erc20abi, provider);
					let balance: BigNumber = await token.balanceOf(wallet);
					if (exchangeRateContract) {
						const savingAsset = new Contract(
							address,
							['function exchangeRate() public view returns (uint256)'],
							provider
						);
						const exchangeRate: BigNumber = await savingAsset.exchangeRate();
						balance = toBn(
							(
								Number(formatUnits(balance, decimals)) * Number(formatUnits(exchangeRate, decimals))
							).toString(),
							decimals
						);
					}
					const formatedBalance = formatUnits(balance, decimals);

					let tokenParams = {
						address,
						symbol,
						decimals,
						image: symbol,
						name: symbol
					};

					if (convertToDefaultUSD) {
						const defaultToken = await usdCoin();
						tokenParams = {
							...stables[networkId][defaultToken],
							image: defaultToken,
							name: defaultToken
						};
					}

					return {
						...tokenParams,
						interestBearingToken: {
							address: interestBearingAddress,
							symbol: interestBearingSymbol,
							decimals: interestBearingDecimals,
							source
						},
						balance: formatedBalance,
						balanceUSD: Number(formatedBalance),
						chainId
					};
				}
			);

			const minkeTokens = await Promise.all(promises);
			return minkeTokens;
		}

		return [];
	});

	const interestBearingTokens = await Promise.all(networkPromises);
	return interestBearingTokens.flat();
};

const fetchStablecoins = async (wallet: string): Promise<MinkeToken[]> => {
	const networkPromises = Object.values(networks).map(async (network) => {
		const { id: networkId, coingeckoPlatform } = network;
		const contracts = Object.values(stables[networkId]).filter(
			({ symbol }) => ['USDC', 'DAI', 'USDT', 'BUSD'].includes(symbol)
			// eslint-disable-next-line function-paren-newline
		);
		const provider = getProvider(networkId);

		const promises = contracts.map(async ({ address, decimals, symbol, chainId }): Promise<MinkeToken> => {
			const stablecoin = new Contract(address, erc20abi, provider);
			const balance: BigNumber = await stablecoin.balanceOf(wallet);
			const formatedBalance = formatUnits(balance, decimals);
			const { id, name } = await searchCoinData(address, coingeckoPlatform, symbol);
			return {
				address,
				symbol,
				decimals,
				balance: formatedBalance,
				balanceUSD: Number(formatedBalance),
				id,
				name,
				chainId
			};
		});

		const tokens = await Promise.all(promises);
		return tokens.filter(({ balanceUSD = 0 }) => balanceUSD > 0);
	});

	const networkTokens = await Promise.all(networkPromises);
	return networkTokens.flat();
};

export { fetchInterestBearingTokens, fetchStablecoins };
