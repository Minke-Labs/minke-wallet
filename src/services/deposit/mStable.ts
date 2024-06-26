import gasLimits, { Networks } from '@models/gas';
import { Network } from '@models/network';
import { getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import { signTypedDataV3 } from '@utils/signing/signing';
import { BigNumber, Contract, ethers, PopulatedTransaction, Wallet } from 'ethers';
import { DepositReturn } from './deposit.types';

const mStableDepositData = async ({
	token,
	amount,
	minAmount,
	network
}: {
	token: string;
	amount: string; // in WEI
	minAmount: string; // in WEI, imUSD decimals,
	network: Network;
}): Promise<PopulatedTransaction> => {
	const { mStable } = network;
	const provider = getProvider(network.id);

	const abi = [
		// eslint-disable-next-line max-len
		'function saveViaMint(address _mAsset, address _save, address _vault, address _bAsset, uint256 _amount, uint256 _minOut, bool _stake) external'
	];
	const { mAsset, saveAsset, vault, depositContract } = mStable!;

	const contract = new Contract(depositContract, abi, provider);
	const tx = await contract.populateTransaction.saveViaMint(
		mAsset, //    _mAsset = mUSD Polygon
		saveAsset, // _save   = imUSD Polygon
		vault, //     _vault  = imUSD Vault Polygon
		token, //     _bAsset = stable being deposited
		amount, //    _amount = stable quantity in WEI, stable decimals
		minAmount, // _minOut = min quantity in WEI, imUSD decimals (18)
		true //       _stake  = stake after minting
	);

	return tx;
};

const mStableDeposit = async ({
	privateKey,
	token,
	amount,
	minAmount,
	maxFeePerGas,
	maxPriorityFeePerGas,
	network
}: {
	privateKey: string;
	token: string;
	amount: string; // in WEI
	minAmount: string; // in WEI, imUSD decimals
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	network: Network;
}): Promise<DepositReturn> => {
	const { mStable, id } = network;

	const provider = getProvider(id);
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
		gasLimit: gasLimits[id as Networks].deposit.mstable,
		maxFeePerGas,
		maxPriorityFeePerGas,
		nonce
	};
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
	maxFeePerGas,
	biconomy,
	network
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	minAmount: string; // in WEI, imUSD decimals
	maxFeePerGas: BigNumber;
	biconomy: any;
	network: Network;
}): Promise<DepositReturn> => {
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey);

	const abi = [
		// eslint-disable-next-line max-len
		'function saveViaMint(address _mAsset, address _save, address _vault, address _bAsset, uint256 _amount, uint256 _minOut, bool _stake) external'
	];

	const contractInterface = new ethers.utils.Interface(abi);

	const { mStable } = network;
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

	const provider = biconomy.getEthersProvider();
	// promise resolves to transaction hash
	try {
		const hash = await provider.send('eth_sendRawTransaction', [data]);
		return hash;
	} catch (error) {
		Logger.error('mStable gasless deposit error', error);
		return null;
	}
};

export { mStableDeposit, gaslessMStableDeposit, mStableDepositData };
