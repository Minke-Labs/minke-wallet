import { ApprovalState } from '@models/deposit';
import gasLimits, { Networks } from '@models/gas';
import { Network, networks } from '@models/network';
import { withdrawTransaction } from '@models/withdraw';
import Logger from '@utils/logger';
import WalletConnect from '@walletconnect/client';
import { toBn } from 'evm-bn';
import ApprovalService from '../approval/ApprovalService';
import { DepositReturn } from '../deposit/deposit.types';
import { gaslessWithdraw, withdraw } from './aave';
import { mStableGaslessWithdraw, mStableWithdraw, mStableWithdrawData, withdrawAmount } from './mStable';
import { WithdrawParams, WithdrawReturn } from './WithdrawService.types';

class WithdrawService {
	protocol: string;

	constructor(protocol: string) {
		this.protocol = protocol;
	}

	public async withdraw({
		gasless,
		address,
		privateKey,
		amount,
		minAmount,
		maxFeePerGas,
		maxPriorityFeePerGas,
		token,
		interestBearingToken,
		biconomy,
		walletConnect,
		connector,
		chainId
	}: WithdrawParams): Promise<WithdrawReturn> {
		const network = Object.values(networks).find((n) => n.chainId === chainId);
		const { isApproved } = await this.approveState(address, interestBearingToken, network);
		if (!isApproved && this.protocol !== 'aave') {
			// Gasless AAVE withdraw uses a permit signature
			const hash = await this.approve({
				gasless,
				address,
				privateKey: privateKey!,
				contract: interestBearingToken,
				biconomy,
				walletConnect,
				connector,
				network
			});

			if (!hash) {
				Logger.log('approval failed');
				return null;
			}
			const provider = biconomy.getEthersProvider();
			await provider.waitForTransaction(hash);
			Logger.log('Withdraw approval', hash);
		}
		if (this.protocol === 'aave') {
			if (gasless) {
				const hash = await gaslessWithdraw({
					address,
					privateKey: privateKey!,
					amount,
					minAmount,
					maxFeePerGas,
					interestBearingToken,
					token,
					biconomy,
					network
				});
				return hash;
			}

			if (walletConnect) {
				const transaction = await withdrawTransaction({
					address,
					privateKey: privateKey!,
					amount,
					minAmount,
					toTokenAddress: token,
					interestBearingToken,
					maxFeePerGas,
					maxPriorityFeePerGas,
					network
				});

				const { from, to, data } = transaction;

				const hash = await connector.sendTransaction({
					from,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString()
				});
				return hash;
			}
			const hash = await withdraw({
				address,
				privateKey: privateKey!,
				amount,
				minAmount,
				toTokenAddress: token,
				interestBearingToken,
				maxFeePerGas,
				maxPriorityFeePerGas,
				network
			});
			return hash;
		}
		if (this.protocol === 'mstable') {
			if (gasless) {
				const hash = await mStableGaslessWithdraw({
					address,
					privateKey: privateKey!,
					amount: await withdrawAmount(amount, address, interestBearingToken, network),
					minAmount,
					maxFeePerGas,
					token,
					biconomy,
					network
				});
				return hash;
			}

			if (walletConnect) {
				const tx = await mStableWithdrawData({
					address,
					amount: await withdrawAmount(amount, address, interestBearingToken, network),
					minAmount,
					token,
					network
				});
				const { to, data } = tx;
				const { id } = network;
				const hash = await connector.sendTransaction({
					from: address,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString(),
					gasLimit: gasLimits[id as Networks].withdraw.mstable.toString()
				});
				return hash;
			}

			const hash = await mStableWithdraw({
				address,
				privateKey: privateKey!,
				amount: await withdrawAmount(amount, address, interestBearingToken, network),
				minAmount,
				maxFeePerGas,
				maxPriorityFeePerGas,
				token,
				network
			});

			return hash;
		}
		return null;
	}

	public async approveState(address: string, contract: string, network: Network): Promise<ApprovalState> {
		return ApprovalService.approveState(address, contract, await this.withdrawContract(network), network.id);
	}

	public async approve({
		gasless,
		address,
		privateKey,
		contract,
		biconomy,
		walletConnect,
		connector,
		network
	}: {
		gasless: boolean;
		address: string;
		privateKey: string;
		contract: string;
		biconomy: any;
		walletConnect: boolean;
		connector: WalletConnect;
		network: Network;
	}): Promise<DepositReturn> {
		const approval = await new ApprovalService().approve({
			gasless,
			address,
			privateKey,
			contract,
			biconomy,
			spender: await this.withdrawContract(network),
			walletConnect,
			connector,
			network
		});
		return approval;
	}

	private async withdrawContract(network: Network): Promise<string> {
		const { mStable, aave } = network;
		return this.protocol === 'mstable' ? mStable?.withdrawContract! : aave.depositContract;
	}
}

export default WithdrawService;
