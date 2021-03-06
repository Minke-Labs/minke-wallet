import { ApprovalState } from '@models/deposit';
import { aaveDepositContract } from '@models/gaslessTransaction';
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
		gasPrice,
		token,
		interestBearingToken,
		biconomy,
		walletConnect,
		connector
	}: WithdrawParams): Promise<WithdrawReturn> {
		const { isApproved } = await this.approveState(address, gasless, interestBearingToken);
		const provider = biconomy.getEthersProvider();
		Logger.log('Is provider ready?', !!provider);
		if (!isApproved && !(this.protocol === 'aave' && gasless)) {
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
					gasPrice,
					interestBearingToken,
					token,
					biconomy
				});
				return hash;
			}

			if (walletConnect) {
				const transaction = await withdrawTransaction({
					address,
					amount,
					toTokenAddress: token,
					interestBearingToken,
					gasPrice: Number(gasPrice)
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
					privateKey: privateKey!,
					amount: await withdrawAmount(amount, address, interestBearingToken),
					minAmount,
					gasPrice,
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
		const { mStable } = await network();
		return this.protocol === 'mstable' ? mStable?.withdrawContract! : aaveDepositContract;
	}
}

export default WithdrawService;
