import { BigNumber, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { usdCoin } from './deposit';
import { network } from './network';
import { MinkeToken } from './token';
import { DepositableToken, DepositTokens, Stables } from './types/depositTokens.types';
import { erc20abi, getProvider } from './wallet';

const stables: Stables = {
	matic: {
		USDC: {
			address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
			decimals: 6,
			symbol: 'USDC'
		},
		DAI: {
			address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
			decimals: 18,
			symbol: 'DAI'
		},
		USDT: {
			address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
			decimals: 6,
			symbol: 'USDT'
		},
		imUSD: {
			address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
			decimals: 18,
			symbol: 'imUSD'
		}
	},
	mainnet: {
		USDC: {
			address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
			decimals: 6,
			symbol: 'USDC'
		},
		DAI: {
			address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
			decimals: 18,
			symbol: 'DAI'
		},
		USDT: {
			address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
			decimals: 6,
			symbol: 'USDT'
		},
		imUSD: {
			address: '0x30647a72Dc82d7Fbb1123EA74716aB8A317Eac19',
			decimals: 18,
			symbol: 'imUSD'
		}
	}
};

const depositTokens: DepositTokens = {
	matic: {
		aave: [
			{
				...stables.matic.USDC,
				interestBearingToken: {
					symbol: 'amUSDC',
					address: '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F',
					decimals: 6
				}
			},
			{
				...stables.matic.DAI,
				interestBearingToken: {
					symbol: 'amDAI',
					address: '0x27F8D03b3a2196956ED754baDc28D73be8830A6e',
					decimals: 18
				}
			},
			{
				...stables.matic.USDT,
				interestBearingToken: {
					symbol: 'amUSDT',
					address: '0x60D55F02A771d515e077c9C2403a1ef324885CeC',
					decimals: 6
				}
			}
		],
		mstable: [
			{
				...stables.matic.imUSD,
				interestBearingToken: {
					exchangeRateContract: true,
					convertToDefaultUSD: true,
					symbol: 'MNKTESTV12',
					address: '0x707AD4021FAd2D9267F918DB937319a8710b10D8',
					decimals: 18
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
					decimals: 6
				}
			},
			{
				...stables.mainnet.DAI,
				interestBearingToken: {
					symbol: 'aDAI',
					address: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
					decimals: 18
				}
			},
			{
				...stables.mainnet.USDT,
				interestBearingToken: {
					symbol: 'aUSDT',
					address: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
					decimals: 6
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
					decimals: 18
				}
			}
		]
	}
};

export const getDepositToken = (id: string, symbol: string, protocol: string): DepositableToken => {
	const values = depositTokens[id][protocol];
	return values.find((t) => symbol.toLowerCase() === t.symbol.toLowerCase()) || values[0];
};

const fetchInterestBearingTokens = async (wallet: string, protocol: string): Promise<MinkeToken[]> => {
	const { id } = await network();
	const provider = await getProvider();
	const tokens = depositTokens[id][protocol];

	const promises = tokens.map(async ({ address, decimals, symbol, interestBearingToken }): Promise<MinkeToken> => {
		const {
			address: interestBearingAddress,
			symbol: interestBearingSymbol,
			decimals: interestBearingDecimals,
			exchangeRateContract,
			convertToDefaultUSD
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
				(Number(formatUnits(balance, decimals)) * Number(formatUnits(exchangeRate, decimals))).toString(),
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
				...stables[id][defaultToken],
				image: defaultToken,
				name: defaultToken
			};
		}

		return {
			...tokenParams,
			interestBearingToken: {
				address: interestBearingAddress,
				symbol: interestBearingSymbol,
				decimals: interestBearingDecimals
			},
			balance: formatedBalance,
			balanceUSD: Number(formatedBalance)
		};
	});

	return Promise.all(promises);
};

export { fetchInterestBearingTokens };
