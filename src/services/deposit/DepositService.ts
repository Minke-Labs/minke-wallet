import { ApprovalState } from '@models/deposit';
import { Network, networks } from '@models/network';
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
		maxFeePerGas,
		maxPriorityFeePerGas,
		biconomy,
		connector,
		walletConnect = false
	}: DepositParams): Promise<DepositReturn> {
		const network = Object.values(networks).find((n) => n.chainId === depositableToken.chainId);
		const { isApproved } = await this.approveState(address, depositableToken.address, network);
		Logger.log('Deposit approved:', isApproved);
		if (!isApproved) {
			await this.approve({
				gasless,
				address,
				privateKey,
				contract: depositableToken.address,
				biconomy,
				walletConnect,
				connector,
				network
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
					maxFeePerGas,
					interestBearingToken: depositableToken.interestBearingToken.address,
					token: depositableToken.address
				});

				return hash;
			}

			if (walletConnect) {
				const { from, to, data } = await depositData({
					address,
					amount,
					minAmount,
					maxFeePerGas,
					maxPriorityFeePerGas,
					interestBearingTokenAddress: depositableToken.interestBearingToken.address,
					tokenAddress: depositableToken.address
				});

				const hash = await connector.sendTransaction({
					from: from!,
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
				minAmount,
				maxFeePerGas,
				maxPriorityFeePerGas,
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
					maxFeePerGas,
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
				maxFeePerGas,
				maxPriorityFeePerGas,
				token: depositableToken.address
			});
			return hash;
		}
		return null;
	}

	private depositContract(network: Network): string {
		const { mStable, aave } = network;
		return this.protocol === 'mstable' ? mStable?.depositContract! : aave.depositContract;
	}

	public async approveState(address: string, contract: string, network: Network): Promise<ApprovalState> {
		return ApprovalService.approveState(address, contract, this.depositContract(network), network.id);
	}

	public async approve({
		gasless,
		address,
		privateKey,
		contract,
		biconomy,
		connector,
		network,
		walletConnect = false
	}: {
		gasless: boolean;
		address: string;
		privateKey: string | null;
		contract: string;
		biconomy: any;
		connector: WalletConnect;
		walletConnect?: boolean;
		network: Network;
	}): Promise<DepositReturn> {
		return new ApprovalService().approve({
			gasless,
			address,
			privateKey,
			contract,
			biconomy,
			spender: this.depositContract(network),
			connector,
			walletConnect,
			networkId: network.id
		});
	}
}

export default DepositService;
