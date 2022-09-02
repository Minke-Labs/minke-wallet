import { network } from '@models/network';
import { getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import { signTypedDataV3 } from '@utils/signing/signing';
import { BigNumber, Contract, ethers, PopulatedTransaction, Wallet } from 'ethers';
import { DepositReturn } from './deposit.types';

export const gaslessDeposit = async ({
	address,
	privateKey,
	token,
	amount,
	interestBearingToken,
	minAmount,
	maxFeePerGas,
	maxPriorityFeePerGas,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	interestBearingToken: string;
	minAmount: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	biconomy: any;
}): Promise<DepositReturn> => {
	const abi = [
		// eslint-disable-next-line max-len
		'function ZapIn(address fromToken, uint256 amountIn, address aToken, uint256 minATokens, address swapTarget, bytes calldata swapData, address affiliate) external payable returns (uint256 aTokensRec)'
	];

	const contractInterface = new ethers.utils.Interface(abi);

	const userSigner = new ethers.Wallet(privateKey);

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('ZapIn', [
		token,
		amount,
		interestBearingToken,
		minAmount,
		'0x0000000000000000000000000000000000000000',
		'0x00',
		'0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'
	]);

	const {
		aave: { depositContract: aaveDepositContract }
	} = await network();

	const rawTx = {
		to: aaveDepositContract,
		data: functionSignature,
		from: address,
		gasLimit: 500000,
		maxFeePerGas,
		maxPriorityFeePerGas
	};

	const signedTx = await userSigner.signTransaction(rawTx);
	// should get user message to sign for EIP712 or personal signature types
	const forwardData = await biconomy.getForwardRequestAndMessageToSign(signedTx);

	const signature = signTypedDataV3({ privateKey, data: forwardData.eip712Format });

	const data = {
		signature,
		forwardRequest: forwardData.request,
		rawTransaction: signedTx,
		signatureType: biconomy.EIP712_SIGN
	};

	const provider = biconomy.getEthersProvider();
	// send signed transaction with ethers
	// promise resolves to transaction hash
	const hash = await provider.send('eth_sendRawTransaction', [data]);
	return hash;
};

export const depositData = async ({
	address,
	amount,
	minAmount,
	tokenAddress,
	interestBearingTokenAddress,
	maxFeePerGas,
	maxPriorityFeePerGas
}: {
	address: string;
	amount: string;
	minAmount: string;
	tokenAddress: string;
	interestBearingTokenAddress: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
}): Promise<PopulatedTransaction> => {
	const { aave } = await network();

	const txDefaults = {
		from: address,
		to: aave.depositContract,
		maxFeePerGas,
		maxPriorityFeePerGas
		// gasLimit: 500000
	};
	const abi = [
		// eslint-disable-next-line max-len
		'function ZapIn(address fromToken, uint256 amountIn, address aToken, uint256 minATokens, address swapTarget, bytes calldata swapData, address affiliate) external payable returns (uint256 aTokensRec)'
	];

	const erc20 = new Contract(aave.depositContract, abi, await getProvider());
	const tx = await erc20.populateTransaction.ZapIn(
		tokenAddress,
		amount,
		interestBearingTokenAddress,
		minAmount,
		'0x0000000000000000000000000000000000000000',
		'0x00',
		'0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'
	);

	return { ...txDefaults, ...tx };
};

export const deposit = async ({
	address,
	privateKey,
	amount,
	minAmount,
	tokenAddress,
	interestBearingTokenAddress,
	maxFeePerGas,
	maxPriorityFeePerGas
}: {
	address: string;
	privateKey: string;
	amount: string;
	minAmount: string;
	tokenAddress: string;
	interestBearingTokenAddress: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
}): Promise<DepositReturn> => {
	const transaction = await depositData({
		address,
		amount,
		minAmount,
		tokenAddress,
		interestBearingTokenAddress,
		maxFeePerGas,
		maxPriorityFeePerGas
	});
	Logger.log(`Deposit API ${JSON.stringify(transaction)}`);

	const { from, to, data, maxFeePerGas: baseFee, maxPriorityFeePerGas: priorityFee } = transaction;

	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const chainId = await wallet.getChainId();
	const nonce = await provider.getTransactionCount(address, 'latest');
	const txDefaults = {
		from,
		to,
		data,
		nonce,
		gasLimit: 500000,
		maxFeePerGas: baseFee,
		maxPriorityFeePerGas: priorityFee,
		type: 2,
		chainId
	};
	Logger.log(`Deposit ${JSON.stringify(txDefaults)}`);
	const signedTx = await wallet.signTransaction(txDefaults);
	const tx = await provider.sendTransaction(signedTx as string);
	const { hash } = tx;
	return hash;
};
