import { network } from '@models/network';
import { getProvider } from '@models/wallet';
import { signTypedDataV3 } from '@utils/signing/signing';
import { Contract, ethers, Wallet } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { DepositReturn } from './deposit.types';

const mStableDeposit = async ({
	privateKey,
	token,
	amount,
	minAmount,
	gasPrice
}: {
	privateKey: string;
	token: string;
	amount: string; // in WEI
	minAmount: string; // in WEI, imUSD decimals
	gasPrice: string;
}): Promise<DepositReturn> => {
	const provider = await getProvider();
	// send signed transaction with ethers
	const userSigner = new Wallet(privateKey, provider);
	const nonce = await userSigner.provider.getTransactionCount(userSigner.address, 'latest');

	const abi = [
		// eslint-disable-next-line max-len
		'function saveViaMint(address _mAsset, address _save, address _vault, address _bAsset, uint256 _amount, uint256 _minOut, bool _stake) external'
	];

	const txDefaults = {
		type: 2,
		chainId: await userSigner.getChainId(),
		gasLimit: 1000000,
		maxFeePerGas: parseUnits(gasPrice, 'gwei'),
		maxPriorityFeePerGas: parseUnits(gasPrice, 'gwei'),
		nonce
	};
	const { mStable } = await network();
	const { mAsset, saveAsset, vault, depositContract } = mStable!;

	const contract = new Contract(depositContract, abi, userSigner);
	const tx = await contract.populateTransaction.saveViaMint(
		mAsset, //    _mAsset = mUSD Polygon
		saveAsset, // _save   = imUSD Polygon
		vault, //     _vault  = imUSD Vault Polygon
		token, //     _bAsset = stable being deposited
		amount, //    _amount = stable quantity in WEI, stable decimals
		minAmount, // _minOut = min quantity in WEI, imUSD decimals (18)
		true //       _stake  = stake after minting
	);
	const signedTx = await userSigner.signTransaction({ ...tx, ...txDefaults });
	const { hash } = await userSigner.provider.sendTransaction(signedTx as string);
	return hash;
};

const gaslessMStableDeposit = async ({
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
	amount: string; // in WEI
	minAmount: string; // in WEI, imUSD decimals
	gasPrice: string;
	biconomy: any;
}): Promise<DepositReturn> => {
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey);

	const abi = [
		// eslint-disable-next-line max-len
		'function saveViaMint(address _mAsset, address _save, address _vault, address _bAsset, uint256 _amount, uint256 _minOut, bool _stake) external'
	];

	const contractInterface = new ethers.utils.Interface(abi);

	const { mStable } = await network();
	const { mAsset, saveAsset, vault, depositContract } = mStable!;
	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('saveViaMint', [
		mAsset, //    _mAsset = mUSD Polygon
		saveAsset, // _save   = imUSD Polygon
		vault, //     _vault  = imUSD Vault Polygon
		token, //     _bAsset = stable being deposited
		amount, //    _amount = stable quantity in WEI, stable decimals
		minAmount, // _minOut = min quantity in WEI, imUSD decimals (18)
		true
	]);

	const rawTx = {
		to: depositContract,
		data: functionSignature,
		from: address,
		gasLimit: 5000000,
		gasPrice: parseUnits(gasPrice, 'gwei')
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

	const provider = biconomy.getEthersProvider();
	// promise resolves to transaction hash
	const hash = await provider.send('eth_sendRawTransaction', [data]);
	return hash;
};

const mStableGaslessWithdraw = async ({
	address,
	privateKey,
	token,
	amount,
	router,
	minAmount,
	gasPrice,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	minAmount: string;
	router: string;
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

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('withdrawAndUnwrap', [
		amount,
		minAmount,
		token,
		address,
		router,
		true,
		[]
	]);

	const { mStable } = await network();
	const rawTx = {
		to: mStable!.withdrawContract,
		data: functionSignature,
		from: address,
		gasLimit: 800000,
		gasPrice: parseUnits(gasPrice, 'gwei')
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

export { mStableDeposit, gaslessMStableDeposit, mStableGaslessWithdraw };
