import { onChainApproval, onChainApprovalData } from '@models/contract';
import { ApprovalState, approvalState } from '@models/deposit';
import { gaslessApproval } from '@models/gaslessTransaction';
import { estimateGas, getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import WalletConnect from '@walletconnect/client';
import { toBn } from 'evm-bn';
import { DepositReturn } from '../deposit/deposit.types';

class ApprovalService {
	protocol: string;

	constructor(protocol: string) {
		this.protocol = protocol;
	}

	public static async approveState(address: string, contract: string, spender: string): Promise<ApprovalState> {
		const approval = await approvalState(address, contract, spender);
		return approval;
	}

	// eslint-disable-next-line class-methods-use-this
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

		return null;
	}
}

export default ApprovalService;
