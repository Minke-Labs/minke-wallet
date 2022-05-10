import { ApprovalState, approvalState, approvalTransaction, zapperApprovalState } from '@models/deposit';
import { Wallet } from 'ethers';
import Logger from '@utils/logger';
import { gaslessApproval } from '@models/gaslessTransaction';
import { estimateGas, getProvider } from '@models/wallet';
import { onChainApproval } from '@models/contract';
import { gaslessDeposit, deposit } from './aave';
import { gaslessMStableDeposit, mStableDeposit } from './mStable';
import { DepositParams, DepositReturn } from './deposit.types';

class DepositSelector {
	protocol: string;

	constructor(protocol: string) {
		this.protocol = protocol;
	}

	public async deposit({
		gasless,
		address,
		privateKey,
		depositableToken,
		amount,
		minAmount,
		gasPrice,
		biconomy
	}: DepositParams): Promise<DepositReturn> {
		if (this.protocol === 'aave') {
			if (gasless) {
				const hash = await gaslessDeposit({
					address,
					privateKey,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					interestBearingToken: depositableToken.interestBearingAddress,
					token: depositableToken.address
				});

				return hash;
			}
			const hash = await deposit({
				address,
				privateKey,
				amount,
				gweiValue: gasPrice,
				interestBearingTokenAddress: depositableToken.interestBearingAddress,
				tokenAddress: depositableToken.address,
				tokenDecimals: 0
			});

			return hash;
		}
		if (this.protocol === 'mstable') {
			if (gasless) {
				const hash = await gaslessMStableDeposit({
					address,
					privateKey,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					token: depositableToken.address
				});
				return hash;
			}

			const hash = await mStableDeposit({
				privateKey,
				amount,
				minAmount,
				gasPrice,
				token: depositableToken.address
			});
			return hash;
		}
		return null;
	}

	public async approveState(
		address: string,
		gasless: boolean,
		contract: string,
		spender: string
	): Promise<ApprovalState> {
		if (this.protocol === 'aave' && !gasless) {
			const approval = await zapperApprovalState(address, spender);
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

			return transaction?.hash || null;
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
			return hash;
		}
		return null;
	}
}

export default DepositSelector;
