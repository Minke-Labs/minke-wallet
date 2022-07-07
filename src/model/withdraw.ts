import * as qs from 'qs';
import { ZAPPER_API_KEY } from '@env';
import { network as selectedNetwork } from './network';

const protocol = 'aave-v2';

export const withdrawTransaction = async ({
	address,
	interestBearingToken,
	toTokenAddress,
	amount,
	gasPrice
}: {
	address: string;
	interestBearingToken: string;
	toTokenAddress: string;
	amount: string; // WEI
	gasPrice: number;
}) => {
	const baseURL = `https://api.zapper.fi/v1/zap-out/interest-bearing/${protocol}/transaction`;
	const apiKey = ZAPPER_API_KEY || process.env.ZAPPER_API_KEY;
	const { zapperNetwork } = await selectedNetwork();
	const gasValue = gasPrice * 1000000000;
	const params = {
		maxFeePerGas: gasValue,
		maxPriorityFeePerGas: gasValue,
		ownerAddress: address.toLowerCase(),
		sellTokenAddress: interestBearingToken.toLowerCase(),
		poolAddress: interestBearingToken.toLowerCase(),
		toTokenAddress: toTokenAddress.toLowerCase(),
		slippagePercentage: 0.05,
		network: zapperNetwork,
		api_key: apiKey,
		sellAmount: amount
	};

	const result = await fetch(`${baseURL}?${qs.stringify(params)}`);

	return result.json();
};
