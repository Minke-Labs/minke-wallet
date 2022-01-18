import { BigNumberish, Contract, providers, Wallet, BigNumber } from 'ethers';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { deleteItemAsync, SecureStoreOptions, WHEN_UNLOCKED } from 'expo-secure-store';
import { find, isEmpty } from 'lodash';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { loadObject, saveObject } from './keychain';

export const publicAccessControlOptions: SecureStoreOptions = {
	keychainAccessible: WHEN_UNLOCKED
};

export const saveSeedPhrase = async (seedPhrase: string, keychain_id: MinkeWallet['id']): Promise<void> => {
	const key = `${keychain_id}_minkeSeedPhrase`;
	const val = {
		id: keychain_id,
		seedPhrase
	} as SeedPhraseData;

	const save = await saveObject(key, val, publicAccessControlOptions);
	return save;
};

export const provider = new providers.InfuraProvider('ropsten', {
	projectId: process.env.INFURA_API_KEY,
	projectSecret: process.env.INFURA_PROJECT_SECRET
});

export const getENSAddress = async (address: string): Promise<string> => {
	const name = await provider.lookupAddress(address);
	return name;
};

export const savePrivateKey = async (address: string, privateKey: null | string) => {
	// const privateAccessControlOptions = await getPrivateAccessControlOptions();

	const key = `${address}_minkePrivateKey`;
	const val = {
		address,
		privateKey
	};

	await saveObject(key, val, publicAccessControlOptions);
};

export const getAllWallets = async (): Promise<null | AllMinkeWallets> => {
	try {
		const allWallets = await loadObject('minkeAllWallets');
		console.log(allWallets);
		if (allWallets) {
			return allWallets as AllMinkeWallets;
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const saveAllWallets = async (wallets: AllMinkeWallets) => {
	await saveObject('minkeAllWallets', wallets, publicAccessControlOptions);
};

export const walletCreate = async (): Promise<null | { wallet: Wallet; walletId: string; balance: BigNumberish }> => {
	const mnemonic = generateMnemonic();
	const seed = await mnemonicToSeed(mnemonic);
	const wallet: Wallet = new Wallet(seed, provider);
	const id = `wallet_${Date.now()}`;
	await saveSeedPhrase(mnemonic, id);
	await savePrivateKey(wallet.address, wallet.privateKey);
	console.log(wallet, wallet.privateKey, wallet.address);
	const newWallet: MinkeWallet = { id, address: wallet.address, name: '', primary: false };
	const existingWallets = (await getAllWallets()) || {};
	const primaryWallet = find(existingWallets, (w) => w.primary);
	if (isEmpty(existingWallets) || isEmpty(primaryWallet)) {
		newWallet.primary = true;
	}
	existingWallets[id] = newWallet;
	await saveAllWallets(existingWallets);
	const balance = await provider.getBalance(wallet.address);
	return { wallet, walletId: id, balance };
};

export const purgeWallets = () => deleteItemAsync('minkeAllWallets');

export const walletDelete = async (id: string): Promise<boolean> => {
	const allWallets = (await getAllWallets()) || {};
	if (allWallets[id]) {
		delete allWallets[id];
		console.log('aaaaaaaaaaaa', allWallets);
		await saveAllWallets(allWallets || {});
		return true;
	}

	return false;
};

export const getSeedPhrase = async (keychain_id: string): Promise<string | null> => {
	const key = `${keychain_id}_minkeSeedPhrase`;

	const seedData = (await loadObject(key)) as SeedPhraseData;
	if (seedData?.seedPhrase) {
		return seedData.seedPhrase;
	}
	return null;
};

export const getPrivateKey = async (address: string): Promise<string | null> => {
	const key = `${address}_minkePrivateKey`;

	const pkey = (await loadObject(key)) as PrivateKeyData;
	if (pkey?.privateKey) {
		return pkey.privateKey;
	}
	return null;
};

export const erc20abi = [
	// Read-Only Functions
	'function balanceOf(address owner) view returns (uint256)',
	'function decimals() view returns (uint8)',
	'function symbol() view returns (string)',

	// Authenticated Functions
	'function transfer(address to, uint amount) returns (bool)',

	// Events
	'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const sendTransaction = async (
	wallet: Wallet,
	to: string,
	amount: string,
	gasPrice: string,
	contractAddress: string = ''
) => {
	const nonce = await provider.getTransactionCount(wallet.address, 'latest');

	const txDefaults = {
		to,
		gasPrice: parseUnits(gasPrice, 'gwei'),
		gasLimit: 41000,
		nonce
	};

	let tx;
	if (contractAddress) {
		// const signer = provider.getSigner(wallet.address)

		const erc20 = new Contract(contractAddress, erc20abi, provider);
		tx = await erc20.populateTransaction.transfer(to, parseUnits(amount));
		tx.gasPrice = await provider.estimateGas(tx);
		// tx.gasLimit = 41000
		// erc20.deployTransaction()
	} else {
		tx = {
			value: parseEther(amount) // @todo: should this be able to process other tokens with other decimals?
		};
	}

	const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
	return provider.sendTransaction(signedTx as string);
};
export const estimateGas = async (): Promise<EstimateGasResponse> => {
	const result = await fetch(
		'https://ethgasstation.info/api/ethgasAPI.json?c7f3543e2274a227ad0f60c97ba1a22abd5c950cc27c25a9ecd7d1a766f0'
	);
	return result.json();
};

export const getEthLastPrice = async (): Promise<EtherLastPriceResponse> => {
	const result = await fetch(
		'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N'
	);
	return result.json();
};

export const getWalletTokens = async (wallet: string): Promise<WalletTokensResponse> => {
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const result = await fetch(
		`https://api.zapper.fi/v1/protocols/tokens/balances?api_key=${apiKey}&addresses[]=${wallet}`
	);
	return result.json();
};

export const smallWalletAddress = (address: string): string =>
	`${address.substring(0, 4)}..${address.substring(address.length - 4)}`;

export const supportedTokenList = {
	dai: '0x31f42841c2db5173425b5223809cf3a38fede360'
};

export interface MinkeTokenList {
	[name: string]: {
		contract: Contract;
		balance: BigNumberish;
	};
}

export interface MinkeWallet {
	id: string;
	address: string;
	name: string;
	primary: boolean;
}

export interface AllMinkeWallets {
	[key: string]: MinkeWallet;
}

export interface PrivateKeyData {
	address: string;
	privateKey: string;
}

export interface SeedPhraseData {
	id: string;
	seedPhrase: string;
}

export interface EstimateGasResponse {
	fast: number;
	fastest: number;
	average: number;
	safeLow: number;
	speed: number;
	block_time: number;
	blockNum: number;
	safeLowWait: number;
	avgWait: number;
	fastWait: number;
	fastestWait: number;
}

export interface EtherLastPriceResponse {
	status: string;
	message: string;
	result: {
		ethbtc: string;
		ethbtc_timestamp: string;
		ethusd: string;
		ethusd_timestamp: string;
	};
}

export interface WalletTokensResponse {
	[key: string]: {
		products: [
			{
				label: string;
				assets: [WalletToken];
			}
		];
	};
}

export interface WalletToken {
	type: string;
	network: string;
	address: string;
	decimals: number;
	symbol: string;
	price: number;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
}
