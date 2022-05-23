import { ApprovalState } from '@models/deposit';
import { aaveDepositContract } from '@models/gaslessTransaction';
import { network } from '@models/network';
import Logger from '@utils/logger';
import { gaslessDeposit, deposit } from './aave';
import { gaslessMStableDeposit, mStableDeposit } from './mStable';
import { DepositParams, DepositReturn } from './deposit.types';
import ApprovalService from '../approval/ApprovalService';

class DepositService {
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
		const { isApproved } = await this.approveState(address, gasless, depositableToken.address);
		Logger.log('Deposit approved:', isApproved);
		if (!isApproved) {
			const hash = await this.approve({
				gasless,
				address,
				privateKey,
				contract: depositableToken.address,
				biconomy
			});
			Logger.log('Deposit approval:', hash);
		}

		if (this.protocol === 'aave') {
			if (gasless) {
				const hash = await gaslessDeposit({
					address,
					privateKey,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					interestBearingToken: depositableToken.interestBearingToken.address,
					token: depositableToken.address
				});

				return hash;
			}
			const hash = await deposit({
				address,
				privateKey,
				amount,
				gweiValue: gasPrice,
				interestBearingTokenAddress: depositableToken.interestBearingToken.address,
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

	private async depositContract(): Promise<string> {
		const { mStable } = await network();
		return this.protocol === 'mstable' ? mStable?.depositContract! : aaveDepositContract;
	}

	public async approveState(address: string, gasless: boolean, contract: string): Promise<ApprovalState> {
		return new ApprovalService(this.protocol).approveState(
			address,
			gasless,
			contract,
			await this.depositContract()
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
		return new ApprovalService(this.protocol).approve({
			gasless,
			address,
			privateKey,
			contract,
			biconomy,
			spender: await this.depositContract()
		});
	}
}

export default DepositService;
