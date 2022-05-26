import { onChainApproval } from '@models/contract';
import { ApprovalState, approvalState, approvalTransaction, zapperApprovalState } from '@models/deposit';
import { gaslessApproval } from '@models/gaslessTransaction';
import { estimateGas, getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import { Wallet } from 'ethers';
import { DepositReturn } from '../deposit/deposit.types';

class ApprovalService {
	protocol: string;

	constructor(protocol: string) {
		this.protocol = protocol;
	}

	public async approveState(
		address: string,
		gasless: boolean,
		contract: string,
		spender: string
	): Promise<ApprovalState> {
		if (this.protocol === 'aave' && !gasless) {
			const approval = await zapperApprovalState(address, contract);
			return approval;
		}

		const approval = await approvalState(address, contract, spender);
		return approval;
	}

	public async approve({
		gasless,
		address,
		privateKey,
		contract,
		spender,
		biconomy
	}: {
		gasless: boolean;
		address: string;
		privateKey: string;
		contract: string;
		spender: string;
		biconomy: any;
	}): Promise<DepositReturn> {
		if (gasless) {
			const hash = await gaslessApproval({
				address,
				privateKey,
				biconomy,
				contract,
				spender
			});
			Logger.log('Gasless approval', hash);
			const provider = biconomy.getEthersProvider();
			await provider.waitForTransaction(hash);
			return hash;
		}
		if (this.protocol === 'mstable') {
			const {
				result: { FastGasPrice: gasPrice }
			} = await estimateGas();
			const { transaction } = await onChainApproval({
				contractAddress: contract,
				spender,
				privateKey,
				gasPrice: +gasPrice * 1000000000
			});

			const { hash } = transaction || {};

			if (hash) {
				const provider = await getProvider();
				await provider.waitForTransaction(hash);
				return hash;
			}
			return null;
		}

		if (this.protocol === 'aave') {
			const transaction = await approvalTransaction(address, contract);
			const { data, from, to, maxFeePerGas, maxPriorityFeePerGas } = transaction;
			const provider = await getProvider();
			const wallet = new Wallet(privateKey, provider);
			const chainId = await wallet.getChainId();
			const nonce = await provider.getTransactionCount(address, 'latest');
			Logger.log(`Approval API ${JSON.stringify(transaction)}`);
			const txDefaults = {
				from,
				to,
				data,
				nonce,
				maxFeePerGas,
				maxPriorityFeePerGas,
				type: 2,
				gasLimit: 500000,
				chainId
			};

			Logger.log(`Approval ${JSON.stringify(txDefaults)}`);

			const signedTx = await wallet.signTransaction(txDefaults);
			const { hash } = await provider.sendTransaction(signedTx as string);
			await provider.waitForTransaction(hash);
			return hash;
		}
		return null;
	}
}

export default ApprovalService;
