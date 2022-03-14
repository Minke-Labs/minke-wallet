import { BigNumber, FixedNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import coins from './coins.json';

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

export const coinFromSymbol = (symbol: string): CoingeckoToken =>
	coins.find((coin) => coin.symbol.toLowerCase() === symbol.toLowerCase()) || ({} as CoingeckoToken);

export const numberFormat = (value: number, digits?: number) =>
	new Intl.NumberFormat('en-US', {
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
