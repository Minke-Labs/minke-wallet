import { Wallet, ethers, BigNumber, Contract } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import Logger from '@utils/logger';
import { captureException } from '@sentry/react-native';
import { gaslessTransactionData, permitSignature, signTypedDataV3 } from '@utils/signing/signing';
import { getProvider } from './wallet';

export const aaveDepositContract = '0x467ebEE3755455A5F2bE81ca50b738D7a375F56a'; // Polygon
export const exchangeContract = '0x986089F230DF31D34A1baE69A08C11ef6b06EcbA'; // Polygon
export const sendContract = '0x70e38dEdC805330286A305966241aBeCC41c2438'; // Polygon
export const mStableDepositContract = '0x3A91390140c30c9C56fC84EdbEa54C683068e85F';

export const gaslessApproval = async ({
	address,
	privateKey,
	amount,
	contract,
	spender,
	biconomy
}: {
	address: string;
	privateKey: string;
	contract: string;
	spender: string;
	amount?: string | undefined;
	biconomy: any;
}): Promise<string | null> => {
	const abi = ['function balanceOf(address owner) view returns (uint256)'];
	const provider = biconomy.getEthersProvider();
	const token = new Contract(contract, abi, provider);
	let tokenAmount = amount;
	if (!amount) {
		const balance: BigNumber = await token.balanceOf(address);
		// @ts-ignore
		tokenAmount = balance;
	}

	const wallet = new Wallet(privateKey, provider);

	const rawTx = {
		to: contract,
		data: await gaslessTransactionData({
			amount: tokenAmount!,
			contract,
			privateKey,
			provider,
			spender,
			userAddress: address
		}),
		from: address
	};

	Logger.log('Gasless approval transaction', rawTx);
	const tx = await wallet.signTransaction(rawTx);

	let transactionHash;
	try {
		await provider.sendTransaction(tx);
	} catch (error: any) {
		// Ethers check the hash from user's signed tx and hash returned from Biconomy
		// Both hash are expected to be different as biconomy send the transaction from its relayers
		if (error.returnedHash && error.expectedHash) {
			transactionHash = error.returnedHash;
		} else {
			captureException(error);
			Logger.error('Error on gasless approval transaction');
		}
	}

	if (transactionHash) {
		// await provider.waitForTransaction(transactionHash);
		Logger.log('Gasless approval transaction - done', transactionHash);
		return transactionHash;
	}

	return null;
};

export const gaslessDeposit = async ({
	address,
	privateKey,
	token,
	amount,
	interestBearingToken,
	minAmount,
	depositContract,
	gasPrice,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	interestBearingToken: string;
	minAmount: string;
	depositContract: string;
	gasPrice: string;
	biconomy: any;
}) => {
	const abi = [
		// eslint-disable-next-line max-len
		'function ZapIn(address fromToken, uint256 amountIn, address aToken, uint256 minATokens, address swapTarget, bytes calldata swapData, address affiliate) external payable returns (uint256 aTokensRec)'
	];

	const contractInterface = new ethers.utils.Interface(abi);

	const userSigner = new ethers.Wallet(privateKey);

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('ZapIn', [
		token,
		amount,
		interestBearingToken,
		minAmount,
		'0x0000000000000000000000000000000000000000',
		'0x00',
		'0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'
	]);

	const rawTx = {
		to: depositContract,
		data: functionSignature,
		from: address,
		gasLimit: 500000,
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
	// send signed transaction with ethers
	// promise resolves to transaction hash
	const txHash = await provider.send('eth_sendRawTransaction', [data]);
	return txHash;
};

export const gaslessWithdraw = async ({
	address,
	privateKey,
	token,
	amount,
	interestBearingToken,
	minAmount,
	depositContract,
	gasPrice,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	interestBearingToken: string;
	minAmount: string;
	depositContract: string;
	gasPrice: string;
	biconomy: any;
}) => {
	const provider = biconomy.getEthersProvider();
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey, provider);

	const permitSig = await permitSignature({
		owner: address,
		spender: depositContract,
		wallet: userSigner,
		token: interestBearingToken
	});

	const abi = [
		// eslint-disable-next-line max-len
		'function ZapOutWithPermit(address fromToken, uint256 amountIn, address toToken, uint256 minToTokens, bytes calldata permitSig, address swapTarget, bytes calldata swapData, address affiliate) external returns (uint256)'
	];

	const contractInterface = new ethers.utils.Interface(abi);

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('ZapOutWithPermit', [
		interestBearingToken,
		amount,
		token,
		minAmount,
		permitSig,
		'0x0000000000000000000000000000000000000000',
		'0x00',
		'0x667fc4b1edc5ff96f45bc382cbfb60b51647948d'
	]);

	const rawTx = {
		to: depositContract,
		data: functionSignature,
		from: address,
		gasLimit: 900000,
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
	const txHash = await provider.send('eth_sendRawTransaction', [data]);
	return txHash;
};

export const gaslessExchange = async ({
	address,
	privateKey,
	token,
	amount,
	toToken,
	minAmount,
	depositContract,
	gasPrice,
	biconomy,
	swapTarget,
	swapData
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in the token decimals
	toToken: string;
	minAmount: string;
	depositContract: string;
	gasPrice: string;
	biconomy: any;
	swapTarget: string;
	swapData: any;
}) => {
	const abi = [
		// eslint-disable-next-line max-len
		'function ZapIn(address fromToken, address toToken, uint256 amountIn, uint256 minTokens, address swapTarget, bytes calldata swapData) external payable returns (uint256)'
	];

	const contractInterface = new ethers.utils.Interface(abi);

	const userSigner = new ethers.Wallet(privateKey);

	const functionSignature = contractInterface.encodeFunctionData('ZapIn', [
		token,
		toToken,
		amount,
		minAmount,
		swapTarget,
		swapData
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
	// send signed transaction with ethers
	// promise resolves to transaction hash
	const txHash = await provider.send('eth_sendRawTransaction', [data]);
	return txHash;
};

export const gaslessSend = async ({
	address,
	privateKey,
	token,
	amount,
	to,
	gasPrice,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	to: string;
	gasPrice: string;
	biconomy: any;
}) => {
	const provider = biconomy.getEthersProvider();
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey, provider);

	const abi = ['function transferERC20Token(address token, address to, uint256 amount) external'];

	const contractInterface = new ethers.utils.Interface(abi);

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('transferERC20Token', [token, to, amount]);

	const rawTx = {
		to: sendContract,
		data: functionSignature,
		from: address,
		gasLimit: 500000,
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
	const txHash = await provider.send('eth_sendRawTransaction', [data]);
	return txHash;
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
}) => {
	const provider = await getProvider();
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey, provider);
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
		'0xE840B73E5287865EEc17d250bFb1536704B43B21', // _mAsset = mUSD Polygon
		'0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af', // _save   = imUSD Polygon
		'0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29', // _vault  = imUSD Vault Polygon
		token, //                                        _bAsset = stable being deposited
		amount, //                                       _amount = stable quantity in WEI, stable decimals
		minAmount, //                                    _minOut = min quantity in WEI, imUSD decimals (18)
		true
	);
	const signedTx = await userSigner.signTransaction({ ...tx, ...txDefaults });
	console.log('sending', { ...tx, ...txDefaults });
	const transaction = await userSigner.provider.sendTransaction(signedTx as string);
	console.log({ transaction });
	console.log('waiting', transaction.hash);
	await transaction.wait(3);
	console.log('finished', transaction.hash);

	return;

	const contractInterface = new ethers.utils.Interface(abi);

	// Create your target method signature.. here we are calling setQuote() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('saveViaMint', [
		'0xE840B73E5287865EEc17d250bFb1536704B43B21', // _mAsset = mUSD Polygon
		'0x5290Ad3d83476CA6A2b178Cd9727eE1EF72432af', // _save   = imUSD Polygon
		'0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29', // _vault  = imUSD Vault Polygon
		token, //                                        _bAsset = stable being deposited
		amount, //                                       _amount = stable quantity in WEI, stable decimals
		minAmount, //                                    _minOut = min quantity in WEI, imUSD decimals (18)
		true
	]);

	const rawTx = {
		to: mStableDepositContract,
		data: functionSignature,
		from: address,
		gasLimit: 500000,
		gasPrice: parseUnits(gasPrice, 'gwei')
	};

	const signedTxa = await userSigner.signTransaction(rawTx);
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
	const txHash = await provider.send('eth_sendRawTransaction', [data]);
	return txHash;
};

export const isExchangeTargetApproved = async (allowanceTarget: string): Promise<boolean> => {
	const abi = ['function approvedTargets(address) public view returns (bool)'];
	try {
		const contract = new Contract(exchangeContract, abi, await getProvider());
		const approved = await contract.approvedTargets(allowanceTarget);
		return approved;
	} catch {
		return false;
	}
};
