import { gaslessDeposit, deposit } from './aave';
import { gaslessMStableDeposit, mStableDeposit } from './mStable';
import { DepositParams, DepositReturn } from './deposit.types';

class DepositSelector {
	protocol: string;

	constructor(protocol: string) {
		this.protocol = protocol;
	}

	public async deposit({
		gasless,
		address,
		privateKey,
		tokenSymbol,
		amount,
		minAmount,
		gasPrice,
		biconomy
	}: DepositParams): Promise<DepositReturn | null> {
		if (this.protocol === 'aave') {
			if (gasless) {
				const response = await gaslessDeposit({
					address,
					privateKey,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					interestBearingToken: 'depositableToken.interestBearingAddress',
					token: 'token.address'
				});

				return response;
			}
			const response = await deposit({
				address,
				privateKey,
				amount,
				gweiValue: gasPrice,
				interestBearingTokenAddress: '',
				tokenAddress: '',
				tokenDecimals: 0
			});

			return response;
		}
		if (this.protocol === 'mstable') {
			if (gasless) {
				const response = await gaslessMStableDeposit({
					address,
					privateKey,
					amount,
					minAmount,
					biconomy,
					gasPrice,
					token: 'token.address'
				});
				return response;
			}

			const response = await mStableDeposit({
				privateKey,
				amount,
				minAmount,
				gasPrice,
				token: 'token.address'
			});
			return response;
		}
		return null;
	}
}

export default DepositSelector;
