import { BigNumber, Contract, Wallet } from 'ethers';
import { permitSignature } from '@utils/signing/signing';
import { getProvider } from './wallet';
import { network as selectedNetwork } from './network';
import gasLimits, { Networks } from './gas';

export const withdrawTransaction = async ({
	address,
	privateKey,
	interestBearingToken,
	toTokenAddress,
	amount,
	minAmount,
	maxFeePerGas,
	maxPriorityFeePerGas
}: {
	address: string;
	privateKey: string;
	interestBearingToken: string;
	toTokenAddress: string;
	amount: string; // WEI
	minAmount: string; // WEI
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
}) => {
	const { aave, id } = await selectedNetwork();

	const txDefaults = {
		from: address,
		to: aave.depositContract,
		maxFeePerGas,
		maxPriorityFeePerGas,
		gasLimit: gasLimits[id as Networks].withdraw.aave,
		type: 2
	};

	const abi = [
		// eslint-disable-next-line max-len
		'function ZapOutWithPermit(address fromToken, uint256 amountIn, address toToken, uint256 minToTokens, bytes calldata permitSig, address swapTarget, bytes calldata swapData, address affiliate) external returns (uint256)'
	];

	const provider = await getProvider();
	const erc20 = new Contract(aave.depositContract, abi, await getProvider());
	const userSigner = new Wallet(privateKey, provider);
	const permitSig = await permitSignature({
		owner: address,
		spender: aave.depositContract,
		wallet: userSigner,
		token: interestBearingToken
	});

	const tx = await erc20.populateTransaction.ZapOutWithPermit(
		interestBearingToken,
		amount,
		toTokenAddress,
		minAmount,
		permitSig,
		'0x0000000000000000000000000000000000000000',
		'0x00',
		'0xe0eE7Fec8eC7eB5e88f1DbBFE3E0681cC49F6499'
	);

	return { ...txDefaults, ...tx };
};
