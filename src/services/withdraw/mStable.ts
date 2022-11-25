import gasLimits, { Networks } from '@models/gas';
import { Network } from '@models/network';
import { getProvider } from '@models/wallet';
import { signTypedDataV3 } from '@utils/signing/signing';
import { BigNumber, Contract, ethers, Wallet } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';

export const withdrawAmount = async (
	amount: string,
	address: string,
	interestBearingAddress: string,
	network: Network
): Promise<BigNumber> => {
	const { mStable } = network;
	const provider = getProvider(network.id);
	const savingAsset = new Contract(
		mStable?.saveAsset!,
		['function exchangeRate() public view returns (uint256)'],
		provider
	);
	const exchangeRate: BigNumber = await savingAsset.exchangeRate();
	const interestTokenAmount = toBn(
		(Number(formatUnits(amount, 18)) / Number(formatUnits(exchangeRate, 18))).toString(),
		18
	);
	const interestToken = new Contract(
		interestBearingAddress,
		['function balanceOf(address owner) view returns (uint256)'],
		provider
	);
	const balance = await interestToken.balanceOf(address);
	return interestTokenAmount.gt(balance) ? balance : interestTokenAmount;
};

const mStableGaslessWithdraw = async ({
	address,
	privateKey,
	token,
	amount,
	minAmount,
	maxFeePerGas,
	biconomy,
	network
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: BigNumber; // BigNumber converted to the im-USD value
	minAmount: string;
	maxFeePerGas: BigNumber;
	biconomy: any;
	network: Network;
}) => {
	const provider = biconomy.getEthersProvider();
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey, provider);
	const abi = [
		// eslint-disable-next-line max-len
		'function withdrawAndUnwrap(uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut, bytes calldata _permitSig) external returns (uint256 outputQuantity)'
	];

	const contractInterface = new ethers.utils.Interface(abi);
	const { mStable } = network;
	const { withdrawContract, mAsset } = mStable!;

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('withdrawAndUnwrap', [
		amount,
		minAmount,
		token,
		address,
		mAsset,
		true,
		[]
	]);

	const rawTx = {
		to: withdrawContract,
		data: functionSignature,
		from: address,
		gasLimit: 1000000,
		gasPrice: maxFeePerGas
	};

	const signedTx = await userSigner.signTransaction(rawTx);
	// should get user message to sign for EIP712 or personal signature types
	const forwardData = await biconomy.getForwardRequestAndMessageToSign(signedTx);

	const signature = signTypedDataV3({ privateKey, data: forwardData.eip712Format });

	const data = {
		signature,
		forwardRequest: forwardData.request,
		rawTransaction: signedTx,
		signatureType: biconomy.EIP712_SIGN
	};

	// promise resolves to transaction hash
	const txHash: string = await provider.send('eth_sendRawTransaction', [data]);
	return txHash;
};

const mStableWithdrawData = async ({
	address,
	amount,
	minAmount,
	token,
	network
}: {
	address: string;
	amount: BigNumber;
	minAmount: string;
	token: string;
	network: Network;
}) => {
	const abi = [
		// eslint-disable-next-line max-len
		'function withdrawAndUnwrap(uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut, bytes calldata _permitSig) external returns (uint256 outputQuantity)'
	];
	const { mStable } = network;
	const provider = getProvider(network.id);
	const { withdrawContract, mAsset } = mStable!;

	const erc20 = new Contract(withdrawContract, abi, provider);
	const tx = await erc20.populateTransaction.withdrawAndUnwrap(amount, minAmount, token, address, mAsset, true, []);

	return tx;
};

const mStableWithdraw = async ({
	address,
	privateKey,
	maxFeePerGas,
	maxPriorityFeePerGas,
	amount,
	minAmount,
	token,
	network
}: {
	address: string;
	privateKey: string;
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	amount: BigNumber; // BigNumber converted to the im-USD value
	minAmount: string;
	token: string;
	network: Network;
}) => {
	const abi = [
		// eslint-disable-next-line max-len
		'function withdrawAndUnwrap(uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut, bytes calldata _permitSig) external returns (uint256 outputQuantity)'
	];
	const { mStable, id } = network;
	const provider = getProvider(id);
	const wallet = new Wallet(privateKey, provider);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
	const chainId = await wallet.getChainId();
	const { withdrawContract, mAsset } = mStable!;
	const txDefaults = {
		type: 2,
		chainId,
		to: withdrawContract,
		maxFeePerGas,
		maxPriorityFeePerGas,
		gasLimit: gasLimits[id as Networks].withdraw.mstable,
		nonce
	};

	const erc20 = new Contract(withdrawContract, abi, wallet.provider);
	const tx = await erc20.populateTransaction.withdrawAndUnwrap(amount, minAmount, token, address, mAsset, true, []);
	const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
	const { hash } = await wallet.provider.sendTransaction(signedTx as string);
	return hash;
};

export { mStableGaslessWithdraw, mStableWithdraw, mStableWithdrawData };
