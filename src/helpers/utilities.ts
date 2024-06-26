import { BigNumber, FixedNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import { Coin } from '@models/wallet';

export function convertEthToUsd(ethValue: BigNumber, ethInUsd: string, round = 2): string {
	const formatedEthInUsd = Math.trunc((+ethInUsd * 100) / 100)
		.toFixed(2)
		.toString();
	const usdInEth = ethValue.mul(parseUnits(formatedEthInUsd, 0));
	return FixedNumber.from(formatUnits(usdInEth)).round(round).toString();
}

interface CoingeckoToken {
	id: string;
	symbol: string;
	name: string;
}

const coinFromSymbol = async (symbol: string, coins: Coin[]): Promise<CoingeckoToken> =>
	coins.find((coin) => coin.symbol.toLowerCase() === symbol.toLowerCase()) || ({} as CoingeckoToken);

export const searchCoinData = async (
	contract: string,
	network: string,
	symbol: string,
	id?: string
): Promise<CoingeckoToken> => {
	const coinList = await AsyncStorage.getItem('@listCoins');
	const coins: Coin[] = JSON.parse(coinList!);
	if (id) return coins.find((coin) => coin.id.toLowerCase() === id.toLowerCase()) || ({} as CoingeckoToken);
	return (
		coins.find(({ platforms }) => contract.toLowerCase() === platforms[network]) || coinFromSymbol(symbol, coins)
	);
};

export const numberFormat = (value: number, digits?: number) =>
	new Intl.NumberFormat(i18n.currentLocale() || 'en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: digits || 2
	}).format(value);

export const tokenBalanceFormat = (value: number | string, digits = 5) => {
	const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${digits}})?`, 'gi');
	return value.toString().match(regex);
};

export const addColorOpacity = (color: string, opacity: number): string => {
	const newOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
	return color + newOpacity.toString(16).toUpperCase();
};

/**
 * @desc Promise that will resolve after the ms interval
 */
// eslint-disable-next-line no-promise-executor-return
export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const REFERRAL_POINTS_TO_USD_CONVERSION = 0.1;
