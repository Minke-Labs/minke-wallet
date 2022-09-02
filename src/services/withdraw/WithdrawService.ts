import { ApprovalState } from '@models/deposit';
import { network } from '@models/network';
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
		connector
	}: WithdrawParams): Promise<WithdrawReturn> {
		const { isApproved } = await this.approveState(address, interestBearingToken);
		if (!isApproved && this.protocol !== 'aave') {
			// Gasless AAVE withdraw uses a permit signature
			const hash = await this.approve({
				gasless,
				address,
				privateKey: privateKey!,
				contract: interestBearingToken,
				biconomy,
				walletConnect,
				connector
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
					maxPriorityFeePerGas,
					interestBearingToken,
					token,
					biconomy
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
					maxPriorityFeePerGas
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
				maxPriorityFeePerGas
			});
			return hash;
		}
		if (this.protocol === 'mstable') {
			if (gasless) {
				const hash = await mStableGaslessWithdraw({
					address,
					privateKey: privateKey!,
					amount: await withdrawAmount(amount, address, interestBearingToken),
					minAmount,
					maxFeePerGas,
					maxPriorityFeePerGas,
					token,
					biconomy
				});
				return hash;
			}

			if (walletConnect) {
				const tx = await mStableWithdrawData({
					address,
					amount: await withdrawAmount(amount, address, interestBearingToken),
					minAmount,
					token
				});
				const { to, data } = tx;
				const hash = await connector.sendTransaction({
					from: address,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString(),
					gasLimit: '800000'
				});
				return hash;
			}

			const hash = await mStableWithdraw({
				address,
				privateKey: privateKey!,
				amount: await withdrawAmount(amount, address, interestBearingToken),
				minAmount,
				maxFeePerGas,
				maxPriorityFeePerGas,
				token
			});

			return hash;
		}
		return null;
	}

	public async approveState(address: string, contract: string): Promise<ApprovalState> {
		return ApprovalService.approveState(address, contract, await this.withdrawContract());
	}

	public async approve({
		gasless,
		address,
		privateKey,
		contract,
		biconomy,
		walletConnect,
		connector
	}: {
		gasless: boolean;
		address: string;
		privateKey: string;
		contract: string;
		biconomy: any;
		walletConnect: boolean;
		connector: WalletConnect;
	}): Promise<DepositReturn> {
		const approval = await new ApprovalService(this.protocol).approve({
			gasless,
			address,
			privateKey,
			contract,
			biconomy,
			spender: await this.withdrawContract(),
			walletConnect,
			connector
		});
		return approval;
	}

	private async withdrawContract(): Promise<string> {
		const { mStable, aave } = await network();
		return this.protocol === 'mstable' ? mStable?.withdrawContract! : aave.depositContract;
	}
}

export default WithdrawService;
