import { ApprovalState } from '@models/deposit';
import { aaveDepositContract } from '@models/gaslessTransaction';
import { network } from '@models/network';
import Logger from '@utils/logger';
import WalletConnect from '@walletconnect/client';
import { toBn } from 'evm-bn';
import { gaslessDeposit, deposit, depositData } from './aave';
import { gaslessMStableDeposit, mStableDeposit, mStableDepositData } from './mStable';
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
		biconomy,
		connector,
		walletConnect = false
	}: DepositParams): Promise<DepositReturn> {
		const { isApproved } = await this.approveState(address, gasless, depositableToken.address);
		Logger.log('Deposit approved:', isApproved);
		const provider = biconomy.getEthersProvider();
		Logger.log('Is provider ready?', !!provider);
		if (!isApproved) {
			await this.approve({
				gasless,
				address,
				privateKey,
				contract: depositableToken.address,
				biconomy,
				walletConnect,
				connector
			});
		}

		if (this.protocol === 'aave') {
			if (gasless) {
				const hash = await gaslessDeposit({
					address,
					privateKey: privateKey!,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					interestBearingToken: depositableToken.interestBearingToken.address,
					token: depositableToken.address
				});

				return hash;
			}

			if (walletConnect) {
				const { from, to, data } = await depositData({
					address,
					amount,
					gweiValue: gasPrice,
					interestBearingTokenAddress: depositableToken.interestBearingToken.address,
					tokenAddress: depositableToken.address
				});

				const hash = await connector.sendTransaction({
					from,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString()
				});
				return hash;
			}
			const hash = await deposit({
				address,
				privateKey: privateKey!,
				amount,
				gweiValue: gasPrice,
				interestBearingTokenAddress: depositableToken.interestBearingToken.address,
				tokenAddress: depositableToken.address
			});

			return hash;
		}
		if (this.protocol === 'mstable') {
			if (gasless) {
				const hash = await gaslessMStableDeposit({
					address,
					privateKey: privateKey!,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					token: depositableToken.address
				});
				return hash;
			}

			if (walletConnect) {
				const { to, data } = await mStableDepositData({
					amount,
					minAmount,
					token: depositableToken.address
				});

				const hash = await connector.sendTransaction({
					from: address,
					to,
					value: toBn('0').toHexString(),
					data: data || toBn('0').toHexString()
				});
				return hash;
			}

			const hash = await mStableDeposit({
				privateKey: privateKey!,
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
		biconomy,
		connector,
		walletConnect = false
	}: {
		gasless: boolean;
		address: string;
		privateKey: string | null;
		contract: string;
		biconomy: any;
		connector: WalletConnect;
		walletConnect?: boolean;
	}): Promise<DepositReturn> {
		return new ApprovalService(this.protocol).approve({
			gasless,
			address,
			privateKey,
			contract,
			biconomy,
			spender: await this.depositContract(),
			connector,
			walletConnect
		});
	}
}

export default DepositService;
