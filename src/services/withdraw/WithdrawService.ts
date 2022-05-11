import { gaslessWithdraw, withdraw } from './aave';
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
			return null;
		}
		return null;
	}
}

export default WithdrawService;
