import { onChainApproval, onChainApprovalData } from '@models/contract';
import { ApprovalState, approvalState, approvalTransaction, zapperApprovalState } from '@models/deposit';
import { gaslessApproval } from '@models/gaslessTransaction';
import { estimateGas, getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import WalletConnect from '@walletconnect/client';
import { Wallet } from 'ethers';
import { toBn } from 'evm-bn';
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
		biconomy,
		walletConnect,
		connector
	}: {
		gasless: boolean;
		address: string;
		privateKey: string | null;
		contract: string;
		spender: string;
		biconomy: any;
		walletConnect: boolean;
		connector: WalletConnect;
	}): Promise<DepositReturn> {
		if (gasless) {
			const hash = await gaslessApproval({
				address,
				privateKey: privateKey!,
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
			let hash;
			if (walletConnect) {
				const tx = await onChainApprovalData({
					address,
					contractAddress: contract,
					spender
				});

				const { data, to } = tx;
				hash = await connector.sendTransaction({
					from: address,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString(),
					gasLimit: '100000'
				});
			} else {
				const {
					result: { FastGasPrice: gasPrice }
				} = await estimateGas();
				const { transaction } = await onChainApproval({
					contractAddress: contract,
					spender,
					privateKey: privateKey!,
					gasPrice: +gasPrice * 1000000000
				});
				hash = transaction?.hash;
			}

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

			if (walletConnect) {
				const hash = await connector.sendTransaction({
					from,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString()
				});
				if (hash) {
					const provider = await getProvider();
					await provider.waitForTransaction(hash);
					return hash;
				}
				return null;
			}

			const provider = await getProvider();
			const wallet = new Wallet(privateKey!, provider);
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
