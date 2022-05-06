import { getProvider } from '@models/wallet';
import { signTypedDataV3 } from '@utils/signing/signing';
import { Contract, ethers, Wallet } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { DepositReturn } from './deposit.types';

export const mStableDepositContract = '0x3A91390140c30c9C56fC84EdbEa54C683068e85F'; // Polygon
export const mAsset = '0xE840B73E5287865EEc17d250bFb1536704B43B21';
export const saveAsset = '0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af';
export const vault = '0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29';

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
	const contract = new Contract(mStableDepositContract, abi, userSigner);
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
	return { hash, wait: userSigner.provider.waitForTransaction };
};

export const gaslessMStableDeposit = async ({
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
		to: mStableDepositContract,
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
	return { hash, wait: provider.waitForTransaction };
};

export { mStableDeposit };
