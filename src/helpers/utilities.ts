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

interface CoinParamFromSymbolProps {
	symbol: string;
	type?: string;
}

export const coinParamFromSymbol = ({ symbol, type = 'id' }: CoinParamFromSymbolProps) => {
	const filtered = coins.find((coin) => coin.symbol === symbol.toLowerCase());
	const indexed = type as keyof typeof filtered;
	return filtered![indexed];
};

export const numberFormat = (value: number, digits?: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: digits || 2
	}).format(value);
