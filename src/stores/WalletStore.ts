/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createState } from '@hookstate/core';
import { find } from 'lodash';
import { BigNumber, Wallet } from 'ethers';
import { defaultNetwork, Network, network as selectedNetwork } from '@src/model/network';
import {
	Coin,
	getAllWallets,
	getPrivateKey,
	getProvider,
	MinkeTokenList,
	Transaction,
	MinkeWallet,
	getWalletTokens,
	saveAllWallets
} from '@models/wallet';

export interface WalletState {
	// wallet: (privateKey: string) => Wallet;
	privateKey: string;
	network: Network;
	address: string;
	tokens?: MinkeTokenList;
	walletId?: string | null;
	balance?: {
		eth?: BigNumber;
		usd?: string;
	};
	transactions?: Array<Transaction>;
	allTokens: Array<Coin>;
}

export const emptyWallet = {
	privateKey: '',
	address: '',
	walletId: null,
	network: defaultNetwork,
	transactions: [],
	allTokens: []
};

export const fetchTokensAndBalances = async (privateKey: string, address: string) => {
	const blockchain = await selectedNetwork();
	const walletObj = new Wallet(privateKey, await getProvider(blockchain.id));
	const eth = await walletObj.getBalance();
	const tokens: MinkeTokenList = {};
	const walletTokens = await getWalletTokens(address);

	let balance;
	if (walletTokens) {
		const { meta } = walletTokens[address.toLowerCase()];
		const { value: total = 0 } = find(meta, (m) => m.label === 'Total') || {};

		const usd = total.toString().match(/^-?\d+(?:\.\d{0,2})?/);
		balance = {
			eth,
			usd: usd ? usd[0] : '0'
		};
	} else {
		balance = { usd: '0' };
	}

	return { tokens, balance, network: blockchain };
};

export const setPrimaryWallet = async (wallet: MinkeWallet): Promise<MinkeWallet> => {
	const allWallets = (await getAllWallets()) || {};
	const chosen = wallet;
	const primaryWallet = find(allWallets, (w) => w.primary);
	if (primaryWallet) {
		primaryWallet.primary = false;
		allWallets[primaryWallet.id] = primaryWallet;
	}
	chosen.primary = true;
	allWallets[chosen.id] = chosen;
	await saveAllWallets(allWallets);
	return chosen;
};

export const walletState = async (wallet: MinkeWallet | undefined): Promise<WalletState> => {
	if (wallet) {
		await setPrimaryWallet(wallet);
		const privateKey = await getPrivateKey(wallet.address);
		if (privateKey) {
			return {
				...{ privateKey, address: wallet.address, walletId: wallet.id, allTokens: [], transactions: [] },
				...(await fetchTokensAndBalances(privateKey, wallet.address))
			};
		}
	}
	return emptyWallet;
};

const initializeWallet = async (): Promise<WalletState> => {
	const wallets = await getAllWallets();
	let wallet = find(wallets, (w: MinkeWallet) => w.primary);
	if (wallets && !wallet) {
		wallet = Object.values(wallets)[0];
	}
	return walletState(wallet as MinkeWallet);
};

const globalStateInit = createState(initializeWallet);

export function globalWalletState() {
	return globalStateInit;
}
