import { Wallet, Contract, providers } from 'ethers';
import { captureException } from '@sentry/react-native';
import { signERC2612Permit } from 'eth-permit';
import Logger from '@utils/logger';
import { erc20abi, getProvider } from './wallet';
import { network } from './network';
import { ParaswapToken } from './token';
import { approvalState } from './deposit';

interface ContractAbiResponse {
	message: string;
	result: string;
	status: string;
}

export const getAbi = async (address: string): Promise<ContractAbiResponse> => {
	const { etherscanAPIURL, etherscanAPIKey: apiKey } = await network();
	const result = await fetch(
		`${etherscanAPIURL}api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
	);
	return result.json();
};

interface ContractApproval {
	permit?: string; // signed tx to be sent to ParaSwap
	// if the contract does not support permit we do a normal approval
	approvalTransaction?: providers.TransactionResponse;
}

export const depositTest = async ({
	privateKey,
	token,
	interestBearingToken,
	amount,
	contractAddress,
	minAmount,
	gasPrice
}: {
	privateKey: string;
	token: string;
	interestBearingToken: string;
	amount: string;
	contractAddress: string;
	minAmount: string;
	gasPrice: number;
}): Promise<ContractApproval> => {
	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');

	const txDefaults = {
		from: await wallet.getAddress(),
		type: 2,
		chainId: await wallet.getChainId(),
		gasLimit: 1000000,
		maxFeePerGas: gasPrice.toString(),
		maxPriorityFeePerGas: gasPrice.toString(),
		nonce
	};

	const erc20 = new Contract(
		contractAddress,
		[
			// eslint-disable-next-line max-len
			'function ZapIn(address fromToken, uint256 amountIn, address aToken, uint256 minATokens, address swapTarget, bytes calldata swapData, address affiliate) external payable returns (uint256 aTokensRec)'
		],
		wallet
	);
	const tx = await erc20.populateTransaction.ZapIn(
		token,
		amount,
		interestBearingToken,
		minAmount,
		'0x0000000000000000000000000000000000000000',
		'0x00',
		'0x3CE37278de6388532C3949ce4e886F365B14fB56'
	);
	const signedTx = await wallet.signTransaction({ ...tx, ...txDefaults });
	return { approvalTransaction: await wallet.provider.sendTransaction(signedTx as string) };
};

const onChainApproval = async ({
	privateKey,
	amount,
	contractAddress,
	spender,
	gasPrice
}: {
	privateKey: string;
	amount: string;
	contractAddress: string;
	spender: string;
	gasPrice: number;
}): Promise<ContractApproval> => {
	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');

	const txDefaults = {
		// from: await wallet.getAddress(),
		type: 2,
		chainId: await wallet.getChainId(),
		gasLimit: 100000,
		maxFeePerGas: gasPrice.toString(),
		maxPriorityFeePerGas: gasPrice.toString(),
		nonce
	};

	const erc20 = new Contract(
		contractAddress,
		['function approve(address spender, uint256 amount) external returns (bool)'],
		wallet
	);
	const tx = await erc20.populateTransaction.approve(spender, amount);
	const signedTx = await wallet.signTransaction({ ...tx, ...txDefaults });
	return { approvalTransaction: await wallet.provider.sendTransaction(signedTx as string) };
};

export const getAllowance = async (address: string, contract: string): Promise<number> => {
	const { chainId } = await network();
	const result = await fetch(`https://apiv5.paraswap.io/users/tokens/${chainId}/${address}`);
	const { tokens }: UserTokens = await result.json();
	const token = tokens.find((t) => t.address.toLowerCase() === contract.toLowerCase());
	return +(token?.allowance || 0);
};

export const approveSpending = async ({
	userAddress,
	privateKey,
	amount,
	contractAddress,
	spender,
	gasPrice
}: {
	userAddress: string;
	privateKey: string;
	amount: string;
	contractAddress: string;
	spender: string;
	gasPrice: number;
}): Promise<ContractApproval> => {
	const { isApproved } = await approvalState(userAddress, contractAddress, spender);
	if (isApproved) {
		return {};
	}
	return onChainApproval({ privateKey, amount, spender, contractAddress, gasPrice });

	const wallet = new Wallet(
		privateKey,
		new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/83f8ae2f577f4b8b9f2db515d2273d17') // @TODO
	);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
	const senderAddress = await wallet.getAddress();

	const txDefaults = {
		from: senderAddress,
		type: 2,
		chainId: await wallet.getChainId(),
		nonce
	};

	const erc20 = new Contract(contractAddress, erc20abi, wallet);
	const { deadline, v, r, s } = await signERC2612Permit(
		wallet,
		contractAddress,
		senderAddress,
		spender,
		amount,
		undefined,
		nonce
	);

	try {
		const tx = await erc20.populateTransaction.permit(senderAddress, spender, amount, deadline, v, r, s);
		const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
		return { permit: signedTx };
	} catch (error) {
		captureException(error);
		Logger.error('Permit transaction error');
		return onChainApproval({ privateKey, amount, spender, contractAddress, gasPrice });
	}
};

interface UserTokens {
	tokens: [ParaswapToken];
}
