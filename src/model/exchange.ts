import { BigNumber } from 'ethers';
import { isExchangeTargetApproved } from './gaslessTransaction';
import { network, networks } from './network';

export const validatedExceptions = ['INSUFFICIENT_ASSET_LIQUIDITY'];

export const POLYGON_GASLESS_TOKENS = [
	'0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a', // SUSHI
	'0x104592a158490a9228070e0a8e5343b499e125d0', // FRAX
	'0x172370d5cd63279efa6d502dab29171933a610af', // CRV
	'0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', // WBTC
	'0x25788a1a171ec66da6502f9975a15b609ff54cf6', // PoolTogether
	'0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
	'0x50b728d8d964fd00c2d0aad81718b71311fef68a', // Synthetix Network Token (PoS)
	'0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39', // LINK
	'0x6265b466d9e6368057ed631caee9c9f84c1a2ad3', // Minke imUSD Vault
	'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', // WETH
	'0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c', // COMP
	'0x85955046df4668e1dd369d2de9f3aeb98dd2a369', // DefiPulse Index (PoS)
	'0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // (PoS) Dai Stablecoin
	'0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3', // BAL
	'0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4', // MANA
	'0xb33eaad8d922b1083446dc23f610c2567fb5180f', // UNI
	'0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // (PoS) Tether USD (USDT)
	'0xc3c7d422809852031b44ab29eec9f1eff2a58756', // Lido DAO Token (PoS)
	'0xd6df932a45c0f255f85145f286ea0b292b21c90b', // AAVE
	'0xd85d1e945766fea5eda9103f918bd915fbca63e6', // CEL
	'0xda537104d6a5edd53c6fbba9a898708e465260b6', // YFI
	'0xe0339c80ffde91f3e20494df88d4206d86024cdf', // Dogelon
	'0xe5417af564e4bfda1c483642db72007871397896' // Gains Network
];

export const isGaslessContract = async (contract: string) => {
	const { chainId } = await network();
	return chainId === networks.matic.chainId && POLYGON_GASLESS_TOKENS.includes(contract.toLowerCase());
};

export const isExchangeGasless = async (value: string, sellTokenAddress: string, contract: string) =>
	BigNumber.from(value).isZero() &&
	(await isGaslessContract(sellTokenAddress)) &&
	(await isExchangeTargetApproved(contract));
