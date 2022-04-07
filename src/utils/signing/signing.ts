import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util';
import { Contract, ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import utf8 from 'utf8';
import {
	ChainDomain,
	ERC2612PermitMessage,
	PermitSignatureProps,
	GetContractNonceProps,
	ApprovalMessage,
	ApprovalFunctionSignatureProps,
	SignTypedDataV3Props
} from './signing.types';

const NONCES_FN = '0x7ecebe00';
const NAME_FN = '0x06fdde03';
const MAX_VALUE = '79228162514260000000000000000';
const MAX_INT = '0xf000000000000000000000000000000000000000000000000000000000000000';
const zeros = (numZeros: number) => ''.padEnd(numZeros, '0');

const EIP712Domain = [
	{ name: 'name', type: 'string' },
	{ name: 'version', type: 'string' },
	{ name: 'chainId', type: 'uint256' },
	{ name: 'verifyingContract', type: 'address' }
];

const createTypedERC2612Data = (message: ERC2612PermitMessage, domain: ChainDomain) => {
	const typedData = {
		types: {
			EIP712Domain,
			Permit: [
				{ name: 'owner', type: 'address' },
				{ name: 'spender', type: 'address' },
				{ name: 'value', type: 'uint256' },
				{ name: 'nonce', type: 'uint256' },
				{ name: 'deadline', type: 'uint256' }
			]
		},
		primaryType: 'Permit',
		domain,
		message
	};

	return typedData;
};

export const hexToUtf8 = (hex: string) => {
	let str = '';
	let code = 0;
	let hexadecimal = hex;
	hexadecimal = hexadecimal.replace(/^0x/i, '');

	// remove 00 padding from either side
	hexadecimal = hexadecimal.replace(/^(?:00)*/, '');
	hexadecimal = hexadecimal.split('').reverse().join('');
	hexadecimal = hexadecimal.replace(/^(?:00)*/, '');
	hexadecimal = hexadecimal.split('').reverse().join('');

	const l = hexadecimal.length;

	for (let i = 0; i < l; i += 2) {
		code = parseInt(hexadecimal.substr(i, 2), 16);
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
	const v = '0x'.concat(signature.slice(130, 132));
	let numericV = ethers.BigNumber.from(v).toNumber();
	if (![27, 28].includes(numericV)) numericV += 27;
	return {
		r,
		s,
		v: numericV
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

const getChainDomain = async (provider: any, token: string | ChainDomain): Promise<ChainDomain> => {
	if (typeof token !== 'string') {
		return token as ChainDomain;
	}

	const tokenAddress = token as string;

	const [name, chainId] = await Promise.all([getTokenName(provider, tokenAddress), getChainId(provider)]);

	const domain: ChainDomain = { name, version: '1', chainId, verifyingContract: tokenAddress };
	return domain;
};

export const getContractNonce = async ({ contract, userAddress, provider }: GetContractNonceProps): Promise<number> => {
	const abi = [
		'function getNonce(address user) public view returns (uint256 nonce)',
		'function _nonces(address user) public view returns (uint256)'
	];
	const token = new Contract(contract, abi, provider);
	let nonce;
	try {
		// eslint-disable-next-line radix
		nonce = parseInt(await token.getNonce(userAddress));
	} catch {
		try {
			// eslint-disable-next-line radix, no-underscore-dangle
			nonce = parseInt(await token._nonces(userAddress));
		} catch {
			nonce = await call(provider, contract, `${NONCES_FN}${zeros(24)}${userAddress.substr(2)}`);
		}
	}

	return nonce;
};

export const permitSignature = async ({ wallet, owner, spender, token }: PermitSignatureProps): Promise<string> => {
	const message: ERC2612PermitMessage = {
		owner,
		spender,
		value: MAX_VALUE,
		nonce: await getContractNonce({ contract: token, userAddress: owner, provider: wallet.provider }),
		deadline: MAX_INT
	};

	const domain = await getChainDomain(wallet.provider, token);
	const typeData = createTypedERC2612Data(message, domain);
	const { EIP712Domain: unused, ...types } = typeData.types;
	// @ts-ignore
	// eslint-disable-next-line no-underscore-dangle
	return wallet._signTypedData(typeData.domain, types, typeData.message);
};

export const signTypedDataV3 = ({ privateKey, data }: SignTypedDataV3Props) => {
	let pk = privateKey;
	if (privateKey.startsWith('0x')) {
		pk = pk.substring(2);
	}

	return signTypedData({
		privateKey: Buffer.from(pk, 'hex'),
		// @ts-ignore
		data,
		version: SignTypedDataVersion.V3
	});
};

const getApproveFunctionSignature = async ({
	provider,
	userAddress,
	privateKey,
	contract,
	spender,
	amount
}: ApprovalFunctionSignatureProps) => {
	const abi = ['function approve(address spender, uint256 amount) external returns (bool)'];
	const contractInterface = new Interface(abi);
	// Create your target method signature.. here we are calling approve() method of our contract
	const functionSignature = contractInterface.encodeFunctionData('approve', [spender, amount]);
	const message: ApprovalMessage = {};
	message.nonce = await getContractNonce({ contract, provider, userAddress });
	message.from = userAddress;
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

	const signature = signTypedDataV3({ privateKey, data: dataToSign });
	const { r, s, v } = getSignatureParameters(signature);
	return { functionSignature, r, s, v };
};

export const gaslessTransactionData = async ({
	userAddress,
	amount,
	contract,
	privateKey,
	provider,
	spender
}: ApprovalFunctionSignatureProps) => {
	const abi = [
		// eslint-disable-next-line max-len
		'function executeMetaTransaction(address userAddress, bytes memory functionSignature, bytes32 sigR, bytes32 sigS, uint8 sigV) external payable returns (bytes memory) '
	];
	const contractInterface = new Interface(abi);
	const { functionSignature, r, s, v } = await getApproveFunctionSignature({
		userAddress,
		amount,
		contract,
		privateKey,
		provider,
		spender
	});
	return contractInterface.encodeFunctionData('executeMetaTransaction', [userAddress, functionSignature, r, s, v]);
};
