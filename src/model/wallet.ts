import { BigNumberish, Contract, providers, Wallet } from 'ethers';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { find, isEmpty } from 'lodash';
import { isValidMnemonic, parseEther, parseUnits } from 'ethers/lib/utils';
import { WalletState } from '@stores/WalletStore';
import { deleteItemAsync } from 'expo-secure-store';
import { convertEthToUsd } from '@helpers/utilities';
import { network as selectedNetwork, networks } from './network';
import { loadObject, saveObject } from './keychain';

export const saveSeedPhrase = async (seedPhrase: string, keychain_id: MinkeWallet['id']): Promise<void> => {
	const key = `${keychain_id}_minkeSeedPhrase`;
	const val = {
		id: keychain_id,
		seedPhrase
	} as SeedPhraseData;

	const save = await saveObject(key, val);
	return save;
};

export const getProvider = async (network?: string) => {
	const blockchain = network || (await selectedNetwork()).id;
	return new providers.InfuraProvider(blockchain, {
		projectId: process.env.INFURA_API_KEY,
		projectSecret: process.env.INFURA_PROJECT_SECRET
	});
};

export const getENSAddress = async (address: string) => {
	const { testnet } = await selectedNetwork();
	const name = (await getProvider(testnet ? networks.ropsten.id : networks.mainnet.id)).lookupAddress(address);
	return name;
};

export const savePrivateKey = async (address: string, privateKey: null | string) => {
	// const privateAccessControlOptions = await getPrivateAccessControlOptions();

	const key = `${address}_minkePrivateKey`;
	const val = {
		address,
		privateKey
	};

	await saveObject(key, val);
};

export const getAllWallets = async (): Promise<null | AllMinkeWallets> => {
	try {
		const allWallets = await loadObject('minkeAllWallets');
		if (allWallets) {
			return allWallets as AllMinkeWallets;
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getEthLastPrice = async (): Promise<EtherLastPriceResponse> => {
	const { etherscanURL, etherscanAPIKey } = await selectedNetwork();
	const apiKey = etherscanAPIKey || 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N';
	const result = await fetch(`${etherscanURL}api?module=stats&action=ethprice&apikey=${apiKey}`);
	return result.json();
};

export const saveAllWallets = async (wallets: AllMinkeWallets) => {
	Object.values(wallets).forEach((w) => {
		w.network = w.network || networks.ropsten.id;
	});
	await saveObject('minkeAllWallets', wallets);
};

const getWalletFromMnemonicOrPrivateKey = async (mnemonicOrPrivateKey = ''): Promise<Wallet> => {
	const blockchain = await selectedNetwork();
	const valid = isValidMnemonic(mnemonicOrPrivateKey);
	if (!mnemonicOrPrivateKey || valid) {
		const mnemonic = valid ? mnemonicOrPrivateKey : generateMnemonic();
		const seed = await mnemonicToSeed(mnemonic);
		return new Wallet(seed, await getProvider(blockchain.id));
	}

	return new Wallet(mnemonicOrPrivateKey, await getProvider(blockchain.id));
};

export const walletCreate = async (mnemonicOrPrivateKey = ''): Promise<WalletState> => {
	const blockchain = await selectedNetwork();
	let wallet: Wallet;
	let mnemonic = '';
	const valid = isValidMnemonic(mnemonicOrPrivateKey);
	if (!mnemonicOrPrivateKey || valid) {
		mnemonic = valid ? mnemonicOrPrivateKey : generateMnemonic();
		const seed = await mnemonicToSeed(mnemonic);
		wallet = new Wallet(seed, await getProvider(blockchain.id));
	} else {
		wallet = new Wallet(mnemonicOrPrivateKey, await getProvider(blockchain.id));
	}

	const id = `wallet_${Date.now()}`;
	if (mnemonic) {
		await saveSeedPhrase(mnemonic, id);
	}

	await savePrivateKey(wallet.address, wallet.privateKey);
	const newWallet: MinkeWallet = { id, address: wallet.address, name: '', primary: false, network: blockchain.id };
	const existingWallets = (await getAllWallets()) || {};
	const primaryWallet = find(existingWallets, (w) => w.primary);
	if (isEmpty(existingWallets) || isEmpty(primaryWallet)) {
		newWallet.primary = true;
	}
	existingWallets[id] = newWallet;
	await saveAllWallets(existingWallets);
	const eth = await wallet.getBalance();
	const ethPrice = await getEthLastPrice();
	const balance = {
		eth,
		usd: convertEthToUsd(eth, ethPrice.result.ethusd)
	};
	return {
		privateKey: wallet.privateKey,
		address: wallet.address,
		walletId: id,
		network: blockchain,
		balance,
		allTokens: [],
		transactions: []
	};
};

export const restoreWalletByMnemonic = async (mnemonicOrPrivateKey: string): Promise<WalletState> => {
	const blockchain = await selectedNetwork();
	const wallet = await getWalletFromMnemonicOrPrivateKey(mnemonicOrPrivateKey);

	const existingWallets = (await getAllWallets()) || {};
	const existingWallet = find(existingWallets, (w) => w.address === wallet.address);

	if (!existingWallet || isEmpty(existingWallet)) {
		return walletCreate(mnemonicOrPrivateKey);
	}
	const eth = await wallet.getBalance();
	const ethPrice = await getEthLastPrice();
	const balance = {
		eth,
		usd: convertEthToUsd(eth, ethPrice.result.ethusd)
	};
	return {
		privateKey: wallet.privateKey,
		address: wallet.address,
		walletId: existingWallet.id,
		network: blockchain,
		balance,
		allTokens: []
	};
};

export const purgeWallets = () => deleteItemAsync('minkeAllWallets');

export const walletDelete = async (id: string): Promise<boolean> => {
	const allWallets = (await getAllWallets()) || {};
	if (allWallets[id]) {
		delete allWallets[id];
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
	privateKey: string,
	to: string,
	amount: string,
	gasPrice: string,
	network: string,
	contractAddress: string = ''
) => {
	const wallet = new Wallet(privateKey, await getProvider(network));
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');

	const txDefaults = {
		to,
		gasPrice: parseUnits(gasPrice, 'gwei'),
		gasLimit: 41000,
		nonce
	};

	let tx;
	if (contractAddress) {
		// const signer = provider.getSigner(wallet.address)

		const erc20 = new Contract(contractAddress, erc20abi, wallet.provider);
		tx = await erc20.populateTransaction.transfer(to, parseUnits(amount));
		tx.gasPrice = await wallet.provider.estimateGas(tx);
		// tx.gasLimit = 41000
		// erc20.deployTransaction()
	} else {
		tx = {
			value: parseEther(amount) // @todo: should this be able to process other tokens with other decimals?
		};
	}

	const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
	return wallet.provider.sendTransaction(signedTx as string);
};
export const estimateGas = async (): Promise<EstimateGasResponse> => {
	const { gasURL, etherscanURL } = await selectedNetwork();
	const result = await fetch(
		`${gasURL || etherscanURL}api?module=gastracker&action=gasoracle&apikey=R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N`
	);
	return result.json();
};

// The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
export const getPriceHistory = async (date: string, tokenId = 'ethereum'): Promise<EtherPriceHistoryResponse> => {
	const result = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}/history?date=${date}`);
	return result.json();
};

export const getWalletTokens = async (wallet: string): Promise<WalletTokensResponse> => {
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const baseURL = 'https://api.zapper.fi/v1/protocols/tokens/balances';
	const result = await fetch(`${baseURL}?api_key=${apiKey}&addresses[]=${wallet}&network=${zapperNetwork}`);
	return result.json();
};

export const getTransactions = async (address: string, page = 1, offset = 100): Promise<Array<Transaction>> => {
	const { etherscanURL, etherscanAPIKey } = await selectedNetwork();
	const apiKey = etherscanAPIKey || 'R3NFBKJNVY4H26JJFJ716AK8QKQKNWRM1N';
	const baseUrl = `${etherscanURL}api?module=account&action=txlist&address=`;
	const suffix = `${address}&page=${page}&offset=${offset}&sort=desc&apikey=${apiKey}`;
	const result = await fetch(`${baseUrl}${suffix}`);
	const { result: normal }: TransactionResponse = await result.json();

	const erc20BaseUrl = `${etherscanURL}api?module=account&action=tokentx&address=`;
	const erc20result = await fetch(`${erc20BaseUrl}${suffix}`);
	const { result: erc20 }: TransactionResponse = await erc20result.json();

	const all = [...erc20, ...normal];
	return all.sort((a, b) => +b.timeStamp - +a.timeStamp);
};

export const getTokenList = async (): Promise<Array<Coin>> => {
	const result = await fetch('https://api.coingecko.com/api/v3/coins/list');
	return result.json();
};

export const smallWalletAddress = (address: string): string =>
	`${address.substring(0, 4)}..${address.substring(address.length - 4)}`;

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
	network: string;
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
	status: string;
	message: string;
	result: {
		LastBlock: string;
		SafeGasPrice: string;
		ProposeGasPrice: string;
		FastGasPrice: string;
		suggestBaseFee: string;
		gasUsedRatio: string;
	};
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

export interface Transaction {
	accessList: string;
	blockHash: string;
	blockNumber: string;
	chainId: string;
	confirmations: string;
	data: string;
	from: string;
	gasLimit: string;
	gasPrice: string;
	hash: string;
	nonce: string;
	timeStamp: string;
	to: string;
	transactionIndex: string;
	type: string;
	value: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	gas: string;
	gasUsed: string;
	input: string;
	isError: string;
	txreceipt_status: string;
	tokenName: string;
	tokenSymbol: string;
	tokenDecimal: string;
}

export interface TransactionResponse {
	result: [Transaction];
	status: string;
	message: string;
}

export interface AllTransactionsResponse {
	normal: Array<TransactionResponse>;
	erc20: Array<TransactionResponse>;
}

export interface EtherPriceHistoryResponse {
	id: string;
	symbol: string;
	name: string;
	market_data: {
		current_price: {
			usd: number;
		};
	};
}

export interface Coin {
	id: string;
	symbol: string;
	name: string;
}
