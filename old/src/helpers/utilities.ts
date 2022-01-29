import { BigNumber, FixedNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

export function convertEthToUsd(ethValue: BigNumber, ethInUsd: string, round = 2): string {
	const formatedEthInUsd = Math.trunc((+ethInUsd * 100) / 100)
		.toFixed(2)
		.toString();
	const usdInEth = ethValue.mul(parseUnits(formatedEthInUsd, 0));
	return FixedNumber.from(formatUnits(usdInEth)).round(round).toString();
}
