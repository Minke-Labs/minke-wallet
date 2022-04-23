/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Alert } from 'react-native';
import { BigNumberish, Contract, providers, Wallet } from 'ethers';
import { find, isEmpty } from 'lodash';
import { isValidMnemonic, parseUnits } from 'ethers/lib/utils';
import makeBlockie from 'ethereum-blockies-base64';
import { deleteItemAsync } from 'expo-secure-store';
import { backupUserDataIntoCloud } from '@models/cloudBackup';
import { seedPhraseKey, privateKeyKey, allWalletsKey } from '@utils/keychainConstants';
import { captureException } from '@sentry/react-native';
import Logger from '@utils/logger';
import * as qs from 'qs';
import * as keychain from './keychain';
import { network as selectedNetwork, Networks, networks } from './network';
import { loadObject, saveObject } from './keychain';

const authenticationPrompt = { authenticationPrompt: { title: 'Please authenticate' } };

export const saveSeedPhrase = async (seedPhrase: string, keychain_id: MinkeWallet['id']): Promise<void> => {
	const key = `${keychain_id}_${seedPhraseKey}`;
	const val = {
		id: keychain_id,
		seedPhrase
	} as SeedPhraseData;

	const privateAccessControlOptions = await keychain.getPrivateAccessControlOptions();

	const save = await saveObject(key, val, privateAccessControlOptions);
	return save;
};

export const getProvider = async (network?: string) => {
	const blockchain = network || (await selectedNetwork()).id;
	const { alchemyAPIKey } = networks[blockchain as keyof Networks];
	return new providers.AlchemyProvider(blockchain, alchemyAPIKey);
};

export const getENSAddress = async (address: string) => {
	const { testnet } = await selectedNetwork();
	const name = (await getProvider(testnet ? networks.ropsten.id : networks.mainnet.id)).lookupAddress(address);
	return name;
};

export const resolveENSAddress = async (ensAddress: string) => {
	const { testnet } = await selectedNetwork();
	const name = (await getProvider(testnet ? networks.ropsten.id : networks.mainnet.id)).resolveName(ensAddress);
	return name;
};

export const getPrivateKey = async (address: string): Promise<string | null> => {
	const key = `${address}_${privateKeyKey}`;

	const pkey = (await loadObject(key, authenticationPrompt)) as PrivateKeyData | -2;

	if (pkey === -2) {
		Alert.alert(
			'Error',
			// eslint-disable-next-line max-len
			'Your current authentication method (Face Recognition) is not secure enough, please go to "Settings > Biometrics & Security" and enable an alternative biometric method like Fingerprint or Iris.'
		);
		return null;
	}

	if (pkey?.privateKey) {
		return pkey.privateKey;
	}
	return null;
};

export const savePrivateKey = async (address: string, privateKey: null | string) => {
	const key = `${address}_${privateKeyKey}`;
	const val = {
		address,
		privateKey
	};

	const privateAccessControlOptions = await keychain.getPrivateAccessControlOptions();

	await saveObject(key, val, privateAccessControlOptions);
};

export const saveAllWallets = async (wallets: AllMinkeWallets) => {
	await saveObject(allWalletsKey, wallets, keychain.publicAccessControlOptions);
};

const clearWalletsWithoutPK = async (allWallets: AllMinkeWallets): Promise<null | AllMinkeWallets> => {
	if (allWallets) {
		const toKeep: string[] = [];
		const asArray: MinkeWallet[] = Object.values(allWallets);
		for (const index in asArray) {
			const { address, id } = asArray[index];
			// eslint-disable-next-line no-await-in-loop
			const primaryKey = await getPrivateKey(address);
			if (primaryKey) {
				toKeep.push(id);
			}
		}

		const filtered = Object.fromEntries(Object.entries(allWallets).filter(([id]) => toKeep.includes(id)));
		await saveAllWallets(filtered);
		if (filtered) {
			return filtered as AllMinkeWallets;
		}
		return null;
	}
	return null;
};

export const getAllWallets = async (): Promise<null | AllMinkeWallets> => {
	try {
		const allWallets = await loadObject(allWalletsKey);
		if (allWallets) {
			const wallets = await clearWalletsWithoutPK(allWallets as AllMinkeWallets);
			return wallets;
		}

		return null;
	} catch (error) {
		Logger.error('Error getAllWallets');
		captureException(error);
		return null;
	}
};

export const getEthLastPrice = async (): Promise<EtherLastPriceResponse> => {
	const { etherscanAPIURL, etherscanAPIKey: apiKey } = await selectedNetwork();
	const result = await fetch(`${etherscanAPIURL}api?module=stats&action=ethprice&apikey=${apiKey}`);
	return result.json();
};

const getWalletFromMnemonicOrPrivateKey = async (mnemonicOrPrivateKey = ''): Promise<WalletAndMnemonic> => {
	const blockchain = await selectedNetwork();
	const provider = await getProvider(blockchain.id);
	if (!mnemonicOrPrivateKey) {
		// mnemonic / PK is empty: generating a random wallet with the default path m/44'/60'/0'/0/0
		const wallet = Wallet.createRandom().connect(provider);
		return { wallet, mnemonic: wallet.mnemonic.phrase };
	}

	if (isValidMnemonic(mnemonicOrPrivateKey)) {
		// mnemonic is valid: generating a wallet based on it.
		const wallet = Wallet.fromMnemonic(mnemonicOrPrivateKey).connect(provider);
		return { wallet, mnemonic: mnemonicOrPrivateKey };
	}

	// Generating a wallet based in the PK (without mnemonic since its not possible to get it from the PK)
	return { wallet: new Wallet(mnemonicOrPrivateKey, provider) };
};

// @TODO - Create always from the same mnemonic if possible.
export const walletCreate = async (mnemonicOrPrivateKey = '', backupFile = ''): Promise<MinkeWallet> => {
	const blockchain = await selectedNetwork();
	const { wallet, mnemonic } = await getWalletFromMnemonicOrPrivateKey(mnemonicOrPrivateKey);

	const id = `wallet_${Date.now()}`;
	if (mnemonic) {
		await saveSeedPhrase(mnemonic, id);
	}

	await savePrivateKey(wallet.address, wallet.privateKey);
	const newWallet: MinkeWallet = {
		id,
		address: wallet.address,
		name: '',
		primary: false,
		network: blockchain.id,
		backedUp: !!backupFile,
		backupFile
	};

	const allWallets = (await getAllWallets()) || {};
	allWallets[newWallet.id] = newWallet;
	await saveAllWallets(allWallets);
	return newWallet;
};

export const restoreWalletByMnemonic = async (
	mnemonicOrPrivateKey: string,
	backupFile?: string
): Promise<MinkeWallet> => {
	const { wallet } = await getWalletFromMnemonicOrPrivateKey(mnemonicOrPrivateKey);
	const existingWallets = (await getAllWallets()) || {};
	const existingWallet = find(existingWallets, (w) => w.address === wallet.address);
	if (!existingWallet || isEmpty(existingWallet)) {
		return walletCreate(mnemonicOrPrivateKey, backupFile);
	}
	await savePrivateKey(wallet.address, wallet.privateKey);
	return existingWallet;
};

export const purgeWallets = () => deleteItemAsync(allWalletsKey);

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
	const key = `${keychain_id}_${seedPhraseKey}`;

	const seedData = (await loadObject(key, authenticationPrompt)) as SeedPhraseData | -2;

	if (seedData === -2) {
		Alert.alert(
			'Error',
			// eslint-disable-next-line max-len
			'Your current authentication method (Face Recognition) is not secure enough, please go to "Settings > Biometrics & Security" and enable an alternative biometric method like Fingerprint or Iris'
		);
		return null;
	}

	if (seedData?.seedPhrase) {
		return seedData.seedPhrase;
	}
	return null;
};

export const erc20abi = [
	// Read-Only Functions
	'function balanceOf(address owner) view returns (uint256)',
	'function allowance(address owner, address spender) external view returns (uint256)',
	'function decimals() view returns (uint8)',
	'function symbol() view returns (string)',

	// Authenticated Functions
	'function transfer(address to, uint amount) returns (bool)',
	'function approve(address spender, uint256 amount) external returns (bool)',
	// eslint-disable-next-line max-len
	'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external',

	// Events
	'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const sendTransaction = async (
	privateKey: string,
	to: string,
	amount: string,
	gasPrice: string,
	network: string,
	contractAddress: string = '',
	decimals: number = 18
) => {
	const wallet = new Wallet(privateKey, await getProvider(network));
	const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
	const chainId = await wallet.getChainId();
	const formattedAmount = amount.replace(',', '.');
	const txDefaults = {
		chainId,
		// @TODO (Marcos): Add chainId and EIP 1559 and gas limit
		to,
		gasPrice: parseUnits(gasPrice, 'gwei'),
		gasLimit: 100000,
		nonce
	};

	let tx;
	if (contractAddress) {
		// const signer = provider.getSigner(wallet.address)

		const erc20 = new Contract(contractAddress, erc20abi, wallet.provider);
		tx = await erc20.populateTransaction.transfer(to, parseUnits(formattedAmount, decimals));
		// tx.gasPrice = await wallet.provider.estimateGas(tx);
		// tx.gasLimit = 41000
		// erc20.deployTransaction()
	} else {
		tx = {
			value: parseUnits(formattedAmount, decimals)
		};
	}

	const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
	return wallet.provider.sendTransaction(signedTx as string);
};

export const estimateGas = async (): Promise<EstimateGasResponse> => {
	const { gasURL, etherscanAPIURL, etherscanAPIKey: apiKey } = await selectedNetwork();
	const result = await fetch(`${gasURL || etherscanAPIURL}api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
	return result.json();
};

export const estimateConfirmationTime = async (gasPrice: number): Promise<EstimateConfirmationTime> => {
	const { etherscanAPIURL, etherscanAPIKey: apiKey } = await selectedNetwork();
	const result = await fetch(
		`${etherscanAPIURL}api?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${apiKey}`
	);
	return result.json();
};

// The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
export const getPriceHistory = async (date: string, tokenId = 'ethereum'): Promise<EtherPriceHistoryResponse> => {
	const result = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}/history?date=${date}`);
	return result.json();
};

export const getTransactions = async (address: string, page = 1, offset = 5): Promise<Array<Transaction>> => {
	const { etherscanAPIURL, etherscanAPIKey: apiKey } = await selectedNetwork();
	const baseUrl = `${etherscanAPIURL}api?module=account&action=txlist&address=`;
	const suffix = `${address}&page=${page}&offset=${offset}&sort=desc&apikey=${apiKey}`;
	const result = await fetch(`${baseUrl}${suffix}`);
	const { result: normal }: TransactionResponse = await result.json();

	const erc20BaseUrl = `${etherscanAPIURL}api?module=account&action=tokentx&address=`;
	const erc20result = await fetch(`${erc20BaseUrl}${suffix}`);
	const { result: erc20 }: TransactionResponse = await erc20result.json();

	const all = [...erc20, ...normal];
	return all.sort((a, b) => +b.timeStamp - +a.timeStamp);
};

export const getZapperTransactions = async (address: string): Promise<ZapperTransactionResponse> => {
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const baseURL = 'https://api.zapper.fi/v1/transactions';
	const params = {
		address: address.toLowerCase(),
		addresses: [address.toLowerCase()],
		network: zapperNetwork,
		api_key: apiKey
	};
	const response = await fetch(`${baseURL}?${qs.stringify(params)}`);

	return response.json();
};

export const getTokenList = async (): Promise<Array<Coin>> => {
	const result = await fetch('https://api.coingecko.com/api/v3/coins/list');
	return result.json();
};

export const smallWalletAddress = (address: string, length = 4): string => {
	if (address.includes('.')) {
		return address;
	}
	return `${address.substring(0, length)}..${address.substring(address.length - length)}`;
};

export const imageSource = async (address: string): Promise<{ uri: string }> => {
	let wallet;
	if (address.includes('.')) {
		wallet = await resolveENSAddress(address);
	}
	return { uri: makeBlockie(wallet || address) };
};

export const setWalletBackedUp = async (walletId: string, backupFile = '') => {
	const allWallets = (await getAllWallets()) || {};
	allWallets[walletId] = {
		...allWallets[walletId],
		backedUp: true,
		backupDate: Date.now(),
		backupFile
	};

	await saveAllWallets(allWallets);

	try {
		await backupUserDataIntoCloud(allWallets);
	} catch (e) {
		Logger.error(e);
		throw e;
	}
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
	network: string;
	backedUp: boolean;
	backupDate?: number;
	backupFile?: string;
}

export interface WalletAndMnemonic {
	wallet: Wallet;
	mnemonic?: string;
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
		UsdPrice: string | undefined;
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

export interface ZapperWalletTokensResponse {
	[key: string]: {
		products: [
			{
				label: string;
				assets: [ZapperToken];
			}
		];
		meta: [
			{
				label: string;
				value: number;
				type: string;
			}
		];
	};
}

export interface ZapperToken {
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
	type?: 'topup' | undefined;
	from: string;
	hash: string;
	timeStamp: string;
	to: string;
	value: string;
	isError: string;
	tokenSymbol: string;
	tokenDecimal: string;
	pending: boolean;
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

export interface EstimateConfirmationTime {
	status: string;
	message: string;
	result: string;
}

export interface ZapperTransactionResponse {
	data: ZapperTransaction[];
}

export interface ZapperSubtransaction {
	type: 'incoming' | 'outgoing';
	symbol: string;
	amount: number;
}

export interface ZapperTransaction {
	hash: string;
	direction: 'incoming' | 'outgoing' | 'exchange';
	timeStamp: string;
	symbol: string;
	amount: string;
	from: string;
	destination: string;
	txSuccessful: boolean;
	subTransactions?: ZapperSubtransaction[]; // important when its an exchange
	name?: string;
	pending?: boolean;
	topUp?: boolean;
}
