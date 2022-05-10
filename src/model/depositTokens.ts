import { BigNumber, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { network } from './network';
import { MinkeToken } from './token';
import { erc20abi, getProvider } from './wallet';

export interface DepositableToken {
	address: string;
	symbol: string;
	decimals: number;
	exchangeRateContract?: boolean; // mStable has an exchange rate
	interestBearingSymbol: string;
	interestBearingAddress: string;
}

interface DepositTokens {
	[networkId: string]: {
		[protocol: string]: DepositableToken[];
	};
}

const depositTokens: DepositTokens = {
	matic: {
		aave: [
			{
				address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
				decimals: 6,
				symbol: 'USDC',
				interestBearingSymbol: 'amUSDC',
				interestBearingAddress: '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F'
			},
			{
				address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
				decimals: 18,
				symbol: 'DAI',
				interestBearingSymbol: 'amDAI',
				interestBearingAddress: '0x27F8D03b3a2196956ED754baDc28D73be8830A6e'
			},
			{
				address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
				decimals: 6,
				symbol: 'USDT',
				interestBearingSymbol: 'amUSDT',
				interestBearingAddress: '0x60D55F02A771d515e077c9C2403a1ef324885CeC'
			}
		],
		mstable: [
			{
				address: '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af',
				decimals: 18,
				symbol: 'imUSD',
				exchangeRateContract: true,
				interestBearingSymbol: 'v-imUSD',
				interestBearingAddress: '0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29'
			}
		]
	},
	mainnet: {
		aave: [
			{
				address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
				decimals: 6,
				symbol: 'USDC',
				interestBearingSymbol: 'aUSDC',
				interestBearingAddress: '0xBcca60bB61934080951369a648Fb03DF4F96263C'
			},
			{
				address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
				decimals: 18,
				symbol: 'DAI',
				interestBearingSymbol: 'aDAI',
				interestBearingAddress: '0x028171bCA77440897B824Ca71D1c56caC55b68A3'
			},
			{
				address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
				decimals: 6,
				symbol: 'USDT',
				interestBearingSymbol: 'aUSDT',
				interestBearingAddress: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811'
			}
		],
		mstable: [
			{
				address: '0x30647a72Dc82d7Fbb1123EA74716aB8A317Eac19',
				decimals: 18,
				symbol: 'imUSD',
				exchangeRateContract: true,
				interestBearingSymbol: 'v-imUSD',
				interestBearingAddress: '0x78BefCa7de27d07DC6e71da295Cc2946681A6c7B'
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

	const promises = tokens.map(
		async ({ address, decimals, symbol, interestBearingAddress, interestBearingSymbol, exchangeRateContract }) => {
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

			return {
				address,
				decimals,
				symbol,
				interestBearingAddress,
				interestBearingSymbol,
				balance: formatedBalance,
				balanceUSD: Number(formatedBalance),
				image: symbol,
				name: symbol
			};
		}
	);

	return Promise.all(promises);
};

export { fetchInterestBearingTokens };
