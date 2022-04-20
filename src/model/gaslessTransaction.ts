import { Wallet, ethers, BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import Logger from '@utils/logger';
import { captureException } from '@sentry/react-native';
import { gaslessTransactionData, permitSignature, signTypedDataV3 } from '@utils/signing/signing';

export const aaveDepositContract = '0x467ebEE3755455A5F2bE81ca50b738D7a375F56a'; // Polygon
export const exchangeContract = '0x4A766Db163506b3C6f492339941B9Ede20a5C4B0'; // Polygon

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
	const abi = [
		'function balanceOf(address owner) view returns (uint256)',
		'function approve(address spender, uint256 amount) external returns (bool)',
		'function decimals() view returns (uint256)'
	];
	const provider = biconomy.getEthersProvider();
	const token = new ethers.Contract(contract, abi, provider);
	let tokenAmount = amount;
	if (!amount) {
		const balance: BigNumber = await token.balanceOf(address);
		// @ts-ignore
		tokenAmount = balance.mul(BigNumber.from(10));
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
