import { Wallet, Contract, providers, BigNumber, PopulatedTransaction } from 'ethers';
import Logger from '@utils/logger';
import { getProvider } from './wallet';
import { network } from './network';
import { approvalState } from './deposit';

interface ContractAbiResponse {
	message: string;
	result: string;
	status: string;
}

interface ContractApproval {
	isApproved?: boolean;
	transaction?: providers.TransactionResponse;
}

export const getAbi = async (address: string): Promise<ContractAbiResponse> => {
	const { etherscanAPIURL, etherscanAPIKey: apiKey } = await network();
	const result = await fetch(
		`${etherscanAPIURL}api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
	);
	return result.json();
};

export const onChainApprovalData = async ({
	address,
	amount,
	contractAddress,
	spender
}: {
	address: string;
	amount?: string;
	contractAddress: string;
	spender: string;
}): Promise<PopulatedTransaction> => {
	const provider = await getProvider();

	const erc20 = new Contract(
		contractAddress,
		[
			'function approve(address spender, uint256 amount) external returns (bool)',
			'function balanceOf(address owner) view returns (uint256)'
		],
		provider
	);

	let tokenAmount = amount;
	if (!amount) {
		const balance: BigNumber = await erc20.balanceOf(address);
		// @ts-ignore
		tokenAmount = balance;
	}
	const tx = await erc20.populateTransaction.approve(spender, tokenAmount);
	return tx;
};

export const onChainApproval = async ({
	privateKey,
	amount,
	contractAddress,
	spender,
	maxFeePerGas,
	maxPriorityFeePerGas
}: {
	privateKey: string;
	amount?: string;
	contractAddress: string;
	spender: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
}): Promise<ContractApproval> => {
	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');

	const txDefaults = {
		type: 2,
		chainId: await wallet.getChainId(),
		gasLimit: 100000,
		maxFeePerGas,
		maxPriorityFeePerGas,
		nonce
	};

	const tx = await onChainApprovalData({ address: wallet.address, contractAddress, amount, spender });
	Logger.log('onChainApproval', { ...tx, ...txDefaults });
	const signedTx = await wallet.signTransaction({ ...tx, ...txDefaults });
	const transaction = await wallet.provider.sendTransaction(signedTx as string);
	return { transaction };
};

export const approveSpending = async ({
	userAddress,
	privateKey,
	amount,
	contractAddress,
	spender,
	maxFeePerGas,
	maxPriorityFeePerGas
}: {
	userAddress: string;
	privateKey: string;
	amount?: string;
	contractAddress: string;
	spender: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
}): Promise<ContractApproval> => {
	const { isApproved } = await approvalState(userAddress, contractAddress, spender);
	if (isApproved) {
		return { isApproved };
	}
	return onChainApproval({ privateKey, amount, spender, contractAddress, maxFeePerGas, maxPriorityFeePerGas });
};
