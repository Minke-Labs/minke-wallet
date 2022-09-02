import { network } from '@models/network';
import { getProvider } from '@models/wallet';
import { withdrawTransaction } from '@models/withdraw';
import Logger from '@utils/logger';
import { permitSignature, signTypedDataV3 } from '@utils/signing/signing';
import { ethers, Wallet } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

export const gaslessWithdraw = async ({
	address,
	privateKey,
	token,
	amount,
	interestBearingToken,
	minAmount,
	gasPrice,
	biconomy
}: {
	address: string;
	privateKey: string;
	token: string;
	amount: string; // in WEI
	interestBearingToken: string;
	minAmount: string;
	gasPrice: string;
	biconomy: any;
}) => {
	const provider = biconomy.getEthersProvider();
	// send signed transaction with ethers
	const userSigner = new ethers.Wallet(privateKey, provider);

	const {
		aave: { depositContract: aaveDepositContract }
	} = await network();

	const permitSig = await permitSignature({
		owner: address,
		spender: aaveDepositContract,
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
		'0xe0eE7Fec8eC7eB5e88f1DbBFE3E0681cC49F6499'
	]);

	const rawTx = {
		to: aaveDepositContract,
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

export const withdraw = async ({
	address,
	toTokenAddress,
	amount,
	minAmount,
	privateKey,
	interestBearingToken,
	gasPrice
}: {
	address: string;
	privateKey: string;
	amount: string;
	minAmount: string;
	toTokenAddress: string;
	interestBearingToken: string;
	gasPrice: string;
}) => {
	const transaction = await withdrawTransaction({
		address,
		privateKey,
		amount,
		minAmount,
		toTokenAddress,
		interestBearingToken,
		gasPrice: Number(gasPrice)
	});
	Logger.log(`Withdraw API ${JSON.stringify(transaction)}`);

	const { from, to, data, gasPrice: gas } = transaction;

	const provider = await getProvider();
	const wallet = new Wallet(privateKey, provider);
	const chainId = await wallet.getChainId();
	const nonce = await provider.getTransactionCount(address, 'latest');
	const txDefaults = {
		from,
		to,
		data,
		nonce,
		gasLimit: 700000,
		maxFeePerGas: gas.toString(),
		maxPriorityFeePerGas: gas.toString(),
		type: 2,
		chainId
	};
	Logger.log(`Withdraw ${JSON.stringify(txDefaults)}`);
	const signedTx = await wallet.signTransaction(txDefaults);
	const tx = await provider.sendTransaction(signedTx as string);
	const { hash } = tx;
	return hash;
};
