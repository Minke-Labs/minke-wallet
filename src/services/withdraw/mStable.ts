import { network } from '@models/network';
import { getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import { signTypedDataV3 } from '@utils/signing/signing';
import { BigNumber, Contract, ethers, Wallet } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';

export const withdrawAmount = async (
	amount: string,
	address: string,
	interestBearingAddress: string
): Promise<BigNumber> => {
	const { mStable } = await network();
	const provider = await getProvider();
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
	gasPrice,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: BigNumber; // BigNumber converted to the im-USD value
	minAmount: string;
	gasPrice: string;
	biconomy: any;
}) => {
	const provider = biconomy.getEthersProvider();
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey, provider);
	const abi = [
		// eslint-disable-next-line max-len
		'function withdrawAndUnwrap(uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut, bytes calldata _permitSig) external returns (uint256 outputQuantity)'
	];

	const contractInterface = new ethers.utils.Interface(abi);
	const { mStable } = await network();
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
		gasPrice: parseUnits(gasPrice, 'gwei')
	};

	Logger.log('mStable gasless withdraw', rawTx);

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

const mStableWithdraw = async ({
	address,
	privateKey,
	gasPrice,
	amount,
	minAmount,
	token
}: {
	address: string;
	privateKey: string;
	gasPrice: string;
	amount: BigNumber; // BigNumber converted to the im-USD value
	minAmount: string;
	token: string;
}) => {
	const abi = [
		// eslint-disable-next-line max-len
		'function withdrawAndUnwrap(uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut, bytes calldata _permitSig) external returns (uint256 outputQuantity)'
	];
	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
	const chainId = await wallet.getChainId();
	const { mStable } = await network();
	const { withdrawContract, mAsset } = mStable!;
	const txDefaults = {
		chainId,
		to: withdrawContract,
		gasPrice: parseUnits(gasPrice, 'gwei'),
		gasLimit: 800000,
		nonce
	};

	const erc20 = new Contract(withdrawContract, abi, wallet.provider);
	const tx = await erc20.populateTransaction.withdrawAndUnwrap(amount, minAmount, token, address, mAsset, true, []);

	const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
	const { hash } = await wallet.provider.sendTransaction(signedTx as string);
	return hash;
};

export { mStableGaslessWithdraw, mStableWithdraw };
