import { ApprovalState } from '@models/deposit';
import { aaveDepositContract } from '@models/gaslessTransaction';
import { network } from '@models/network';
import ApprovalService from '../approval/ApprovalService';
import { DepositReturn } from '../deposit/deposit.types';
import { gaslessWithdraw, withdraw } from './aave';
import { mStableGaslessWithdraw, mStableWithdraw, withdrawAmount } from './mStable';
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
		gasPrice,
		token,
		interestBearingToken,
		biconomy
	}: WithdrawParams): Promise<WithdrawReturn> {
		const { isApproved } = await this.approveState(address, gasless, interestBearingToken);
		if (!isApproved && !(this.protocol === 'aave' && gasless)) {
			// Gasless AAVE withdraw uses a permit signature
			const hash = await this.approve({
				gasless,
				address,
				privateKey,
				contract: interestBearingToken,
				biconomy
			});

			if (!hash) {
				console.log('approval failed');
				return null;
			}
		}
		if (this.protocol === 'aave') {
			if (gasless) {
				const hash = await gaslessWithdraw({
					address,
					privateKey,
					amount,
					minAmount,
					gasPrice,
					interestBearingToken,
					token,
					biconomy
				});
				return hash;
			}

			const hash = await withdraw({
				address,
				privateKey,
				amount,
				toTokenAddress: token,
				interestBearingToken,
				gasPrice
			});
			return hash;
		}
		if (this.protocol === 'mstable') {
			if (gasless) {
				const hash = await mStableGaslessWithdraw({
					address,
					privateKey,
					amount: await withdrawAmount(amount, address, interestBearingToken),
					minAmount,
					gasPrice,
					token,
					biconomy
				});
				return hash;
			}

			const hash = await mStableWithdraw({
				address,
				privateKey,
				amount: await withdrawAmount(amount, address, interestBearingToken),
				minAmount,
				gasPrice,
				token
			});

			return hash;
		}
		return null;
	}

	public async approveState(address: string, gasless: boolean, contract: string): Promise<ApprovalState> {
		return new ApprovalService(this.protocol).approveState(
			address,
			gasless,
			contract,
			await this.withdrawContract()
		);
	}

	public async approve({
		gasless,
		address,
		privateKey,
		contract,
		biconomy
	}: {
		gasless: boolean;
		address: string;
		privateKey: string;
		contract: string;
		biconomy: any;
	}): Promise<DepositReturn> {
		const approval = await new ApprovalService(this.protocol).approve({
			gasless,
			address,
			privateKey,
			contract,
			biconomy,
			spender: await this.withdrawContract()
		});
		return approval;
	}

	private async withdrawContract(): Promise<string> {
		const { mStable } = await network();
		return this.protocol === 'mstable' ? mStable?.withdrawContract! : aaveDepositContract;
	}
}

export default WithdrawService;
