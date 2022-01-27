import { createState } from '@hookstate/core';
import { find } from 'lodash';
import { BigNumber, Wallet } from 'ethers';
import { defaultNetwork, Network, network as selectedNetwork } from '@models/network';
import {
	Coin,
	getAllWallets,
	getPrivateKey,
	getProvider,
	MinkeTokenList,
	Transaction,
	MinkeWallet,
	getWalletTokens
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
	const { meta } = walletTokens[address.toLowerCase()];
	const { value: total = 0 } = find(meta, (m) => m.label === 'Total') || {};

	const usd = total.toString().match(/^-?\d+(?:\.\d{0,2})?/);
	const balance = {
		eth,
		usd: usd ? usd[0] : '0'
	};
	return { tokens, balance, network: blockchain };
};

export const walletState = async (wallet: MinkeWallet | undefined): Promise<WalletState> => {
	if (wallet) {
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
	const wallet = find(wallets, (w) => w.primary);
	return walletState(wallet);
};

const globalStateInit = createState(initializeWallet);

export function globalWalletState() {
	return globalStateInit;
}
