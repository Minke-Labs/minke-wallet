import { onChainApproval, onChainApprovalData } from '@models/contract';
import { ApprovalState, approvalState } from '@models/deposit';
import gasLimits from '@models/gas';
import { gaslessApproval } from '@models/gaslessTransaction';
import { Network } from '@models/network';
import { estimateGas, getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import WalletConnect from '@walletconnect/client';
import { parseUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { DepositReturn } from '../deposit/deposit.types';

class ApprovalService {
	public static async approveState(
		address: string,
		contract: string,
		spender: string,
		networkId: string
	): Promise<ApprovalState> {
		const approval = await approvalState(address, contract, spender, networkId);
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
		connector,
		network
	}: {
		gasless: boolean;
		address: string;
		privateKey: string | null;
		contract: string;
		spender: string;
		biconomy: any;
		walletConnect: boolean;
		connector: WalletConnect;
		network: Network;
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
				spender,
				networkId: network.id
			});

			const { data, to } = tx;
			hash = await connector.sendTransaction({
				from: address,
				to,
				value: toBn('0').toHexString(),
				data: data || toBn('0').toHexString(),
				gasLimit: gasLimits.approval.toString()
			});
		} else {
			const {
				result: { FastGasPrice: fast, suggestBaseFee = '0' }
			} = await estimateGas(network);
			const maxPriorityFeePerGas = parseUnits(fast, 'gwei');
			const maxFeePerGas = parseUnits(suggestBaseFee, 'gwei').add(maxPriorityFeePerGas);

			const { transaction } = await onChainApproval({
				contractAddress: contract,
				spender,
				privateKey: privateKey!,
				maxFeePerGas,
				maxPriorityFeePerGas,
				network
			});
			hash = transaction?.hash;
		}

		if (hash) {
			const provider = getProvider(network.id);
			await provider.waitForTransaction(hash);
			return hash;
		}

		return null;
	}
}

export default ApprovalService;
