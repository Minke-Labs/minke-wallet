import { BigNumber } from 'ethers';
import { isExchangeTargetApproved } from './gaslessTransaction';

export const validatedExceptions = ['INSUFFICIENT_ASSET_LIQUIDITY'];

const GAS_TOKENS = ['0xb5c064f955d8e7f38fe0460c556a72987494ee17', '0x8a953cfe442c5e8855cc6c61b1293fa648bae472'];

export const isExchangeGasless = async (value: string, sellTokenAddress: string, contract: string) =>
	BigNumber.from(value).isZero() &&
	!GAS_TOKENS.includes(sellTokenAddress.toLowerCase()) &&
	(await isExchangeTargetApproved(contract));
