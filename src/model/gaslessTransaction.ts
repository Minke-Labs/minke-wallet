import * as sigUtil from 'eth-sig-util';
import { Wallet, ethers } from 'ethers';
import { Interface, parseUnits } from 'ethers/lib/utils';
import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util';
import utf8 from 'utf8';

const NONCES_FN = '0x7ecebe00';
const NAME_FN = '0x06fdde03';
const zeros = (numZeros: number) => ''.padEnd(numZeros, '0');

export const hexToUtf8 = (hex: string) => {
	// if (!isHexStrict(hex))
	//     throw new Error('The parameter "'+ hex +'" must be a valid HEX string.');

	let str = '';
	let code = 0;
	hex = hex.replace(/^0x/i, '');

	// remove 00 padding from either side
	hex = hex.replace(/^(?:00)*/, '');
	hex = hex.split('').reverse().join('');
	hex = hex.replace(/^(?:00)*/, '');
	hex = hex.split('').reverse().join('');

	const l = hex.length;

	for (let i = 0; i < l; i += 2) {
		code = parseInt(hex.substr(i, 2), 16);
		// if (code !== 0) {
		str += String.fromCharCode(code);
		// }
	}

	return utf8.decode(str);
};

const domainType = [
	{ name: 'name', type: 'string' },
	{ name: 'version', type: 'string' },
	{ name: 'verifyingContract', type: 'address' },
	{ name: 'salt', type: 'bytes32' }
];

const metaTransactionType = [
	{ name: 'nonce', type: 'uint256' },
	{ name: 'from', type: 'address' },
	{ name: 'functionSignature', type: 'bytes' }
];

const getSignatureParameters = (signature: string) => {
	if (!ethers.utils.isHexString(signature)) {
		throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'));
	}
	const r = signature.slice(0, 66);
	const s = '0x'.concat(signature.slice(66, 130));
	let v = '0x'.concat(signature.slice(130, 132));
	v = ethers.BigNumber.from(v).toNumber();
	if (![27, 28].includes(v)) v += 27;
	return {
		r,
		s,
		v
	};
};

interface Domain {
	name: string;
	version: string;
	verifyingContract: string;
	salt: string;
}

export const call = (provider: any, to: string, data: string) =>
	provider.send('eth_call', [
		{
			to,
			data
		},
		'latest'
	]);

const getTokenName = async (provider: any, address: string) =>
	hexToUtf8((await call(provider, address, NAME_FN)).substr(130));

export const getChainId = async (provider: any): Promise<any> => provider.send('eth_chainId');

const getDomain = async (provider: any, token: string | Domain): Promise<Domain> => {
	if (typeof token !== 'string') {
		return token as Domain;
	}

	const tokenAddress = token as string;

	const [name, chainId] = await Promise.all([getTokenName(provider, tokenAddress), getChainId(provider)]);

	const salt = ethers.utils.hexZeroPad(ethers.BigNumber.from(chainId).toHexString(), 32);

	const domain: Domain = { name, version: '1', salt, verifyingContract: tokenAddress };
	return domain;
};

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
	amount: string;
	biconomy: any;
}) => {
	const abi = [
		'function approve(address spender, uint256 amount) external returns (bool)',
		'function getNonce(address user) public view returns (uint256 nonce)',
		// eslint-disable-next-line max-len
		'function executeMetaTransaction(address userAddress, bytes memory functionSignature, bytes32 sigR, bytes32 sigS, uint8 sigV) external payable returns (bytes memory) '
	];
	const provider = biconomy.getEthersProvider();
	const token = new ethers.Contract(contract, abi, provider);
	const contractInterface = new Interface(abi);
	const wallet = new Wallet(privateKey, provider);

	// Create your target method signature.. here we are calling approve() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('approve', [spender, amount]);
	const message = {};
	let nonce;
	try {
		// eslint-disable-next-line radix
		nonce = parseInt(await token.getNonce(address));
	} catch {
		nonce = await call(provider, contract, `${NONCES_FN}${zeros(24)}${address.substr(2)}`);
	}
	message.nonce = nonce;
	message.from = address;
	message.functionSignature = functionSignature;

	const domainData = await getDomain(provider, contract);

	const dataToSign = {
		types: {
			EIP712Domain: domainType,
			MetaTransaction: metaTransactionType
		},
		domain: domainData,
		primaryType: 'MetaTransaction',
		message
	};

	let pk = privateKey;
	if (privateKey.startsWith('0x')) {
		pk = pk.substring(2);
	}

	const signature = signTypedData({
		privateKey: Buffer.from(pk, 'hex'),
		data: dataToSign,
		version: SignTypedDataVersion.V3
	});

	// const signature = sigUtil.signTypedMessage(new Buffer.from(pk, 'hex'), { data: dataToSign }, 'V3');
	const { r, s, v } = getSignatureParameters(signature);
	const rawTx = {
		to: contract,
		data: contractInterface.encodeFunctionData('executeMetaTransaction', [address, functionSignature, r, s, v]),
		from: address
	};
	const tx = await wallet.signTransaction(rawTx);

	let transactionHash;
	try {
		await provider.sendTransaction(tx);
	} catch (error) {
		// Ethers check the hash from user's signed tx and hash returned from Biconomy
		// Both hash are expected to be different as biconomy send the transaction from its relayers
		if (error.returnedHash && error.expectedHash) {
			console.log('Transaction hash : ', error.returnedHash);
			transactionHash = error.returnedHash;
		} else {
			console.error(error);
		}
	}

	if (transactionHash) {
		await provider.waitForTransaction(transactionHash);
		return transactionHash;
	}

	console.log('Sending normal transaction');
	const { wait, hash } = await token.approve(spender, amount);
	console.log('Transaction hash : ', hash);
	await wait();
	return hash;
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
	amount: string;
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
		'0x667fc4b1edc5ff96f45bc382cbfb60b51647948d'
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

	let pk = privateKey;
	if (privateKey.startsWith('0x')) {
		pk = pk.substring(2);
	}
	const signature = signTypedData({
		privateKey: Buffer.from(pk, 'hex'),
		data: forwardData.eip712Format,
		version: SignTypedDataVersion.V3
	});

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
	console.log('Waiting for onChain confirmation', txHash);
	await provider.waitForTransaction(txHash);
	return txHash;
};
