import { Wallet, Contract, providers, BigNumber, PopulatedTransaction } from 'ethers';
import Logger from '@utils/logger';
import gasLimits from '@models/gas';
import { getProvider } from './wallet';
import { approvalState } from './deposit';

interface ContractApproval {
	isApproved?: boolean;
	transaction?: providers.TransactionResponse;
}

// @TODO: network
export const onChainApprovalData = async ({
	address,
	amount,
	contractAddress,
	spender,
	networkId
}: {
	address: string;
	amount?: string;
	contractAddress: string;
	spender: string;
	networkId: string;
}): Promise<PopulatedTransaction> => {
	const provider = getProvider(networkId);

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

// @TODO: network
export const onChainApproval = async ({
	privateKey,
	amount,
	contractAddress,
	spender,
	maxFeePerGas,
	maxPriorityFeePerGas,
	networkId
}: {
	privateKey: string;
	amount?: string;
	contractAddress: string;
	spender: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	networkId: string;
}): Promise<ContractApproval> => {
	const provider = getProvider(networkId);
	const wallet = new Wallet(privateKey, provider);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');

	const txDefaults = {
		type: 2,
		chainId: await wallet.getChainId(),
		gasLimit: gasLimits.approval.toString(),
		maxFeePerGas,
		maxPriorityFeePerGas,
		nonce
	};

	const tx = await onChainApprovalData({ address: wallet.address, contractAddress, amount, spender, networkId });
	Logger.log('onChainApproval', { ...tx, ...txDefaults });
	const signedTx = await wallet.signTransaction({ ...tx, ...txDefaults });
	const transaction = await wallet.provider.sendTransaction(signedTx as string);
	return { transaction };
};
// @TODO: approve
export const approveSpending = async ({
	userAddress,
	privateKey,
	amount,
	contractAddress,
	spender,
	maxFeePerGas,
	maxPriorityFeePerGas,
	networkId
}: {
	userAddress: string;
	privateKey: string;
	amount?: string;
	contractAddress: string;
	spender: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	networkId: string;
}): Promise<ContractApproval> => {
	const { isApproved } = await approvalState(userAddress, contractAddress, spender, networkId);
	if (isApproved) {
		return { isApproved };
	}
	return onChainApproval({
		privateKey,
		amount,
		spender,
		contractAddress,
		maxFeePerGas,
		maxPriorityFeePerGas,
		networkId
	});
};
