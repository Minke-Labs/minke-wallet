import Logger from '@utils/logger';
import { Wallet } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { approvalTransaction, zapperApprovalState } from './deposit';
import { getProvider } from './wallet';
import { network as selectedNetwork } from './network';

const protocol = 'aave-v2';

const approvalWithdrawTransaction = async (
	address: string,
	amount: string,
	decimals: number,
	interestBearingToken: string,
	privateKey: string
): Promise<string | undefined> => {
	const approval = await approvalTransaction(address, interestBearingToken, 'out', amount, decimals);
	const { data, from, to, maxFeePerGas, maxPriorityFeePerGas } = approval;
	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const chainId = await wallet.getChainId();
	const nonce = await provider.getTransactionCount(address, 'latest');
	Logger.log(`Approval API Withdraw ${JSON.stringify(approval)}`);
	const txDefaults = {
		from,
		to,
		data,
		nonce,
		maxFeePerGas,
		maxPriorityFeePerGas,
		type: 2,
		gasLimit: 100000,
		chainId
	};

	Logger.log(`Withdraw Approval ${JSON.stringify(txDefaults)}`);
	const signedTx = await wallet.signTransaction(txDefaults);
	const { hash, wait } = await provider.sendTransaction(signedTx as string);
	if (hash) {
		await wait();
		return hash;
	}

	return undefined;
};

export const withdrawTransaction = async ({
	address,
	privateKey,
	interestBearingToken,
	toTokenAddress,
	decimals,
	amount,
	gweiValue
}: {
	address: string;
	privateKey: string;
	interestBearingToken: string;
	toTokenAddress: string;
	decimals: number;
	amount: string;
	gweiValue: number;
}) => {
	const { isApproved } = await zapperApprovalState(address, interestBearingToken);

	if (!isApproved) {
		await approvalWithdrawTransaction(address, amount, decimals, interestBearingToken, privateKey);
	}

	const baseURL = `https://api.zapper.fi/v1/zap-out/interest-bearing/${protocol}/transaction`;
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const gasValue = gweiValue * 1000000000;
	const gas = `&maxFeePerGas=${gasValue}&maxPriorityFeePerGas=${gasValue}`;
	const addresses = `&ownerAddress=${address}&sellTokenAddress=${interestBearingToken}`;
	const poolAddresses = `&poolAddress=${interestBearingToken}&toTokenAddress=${toTokenAddress}`;
	const slippage = '&slippagePercentage=0.05';
	const network = `&network=${zapperNetwork}&api_key=${apiKey}${gas}`;
	const tokenAmount = formatUnits(toBn(amount, decimals), 'wei');
	const result = await fetch(
		`${baseURL}?&sellAmount=${tokenAmount}${addresses}${poolAddresses}${slippage}${network}`
	);

	return result.json();
};
