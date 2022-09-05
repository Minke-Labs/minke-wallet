import { BigNumber } from 'ethers';
import { isExchangeTargetApproved } from './gaslessTransaction';

export const validatedExceptions = ['INSUFFICIENT_ASSET_LIQUIDITY'];

export const isExchangeGasless = async (value: string, destination: string) =>
	BigNumber.from(value).isZero() && (await isExchangeTargetApproved(destination));
