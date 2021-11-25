import {BigNumber, BigNumberish, FixedNumber} from "ethers";
import {formatUnits, getAddress, parseUnits} from "ethers/lib/utils";


export function convertEthToUsd(ethValue: BigNumber, ethInUsd: string, round = 2): string {
  const usdInEth = ethValue.mul(parseUnits(ethInUsd,2));
  return FixedNumber.from(formatUnits(usdInEth)).round(round).toString()
}
