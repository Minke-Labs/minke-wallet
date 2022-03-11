/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createState } from '@hookstate/core';
import { find } from 'lodash';
import { BigNumber, Wallet } from 'ethers';
import { defaultNetwork, Network, network as selectedNetwork } from '@src/model/network';
import { getAllWallets, getPrivateKey, getProvider, Transaction, MinkeWallet, saveAllWallets } from '@models/wallet';
import { getTokenBalances } from '@src/services/apis';

export interface WalletState {
	privateKey: string;
	network: Network;
	address: string;
	walletId?: string | null;
	balance?: {
		eth?: BigNumber;
		usd?: number;
	};
	transactions?: Array<Transaction>;
}

export const emptyWallet = {
	privateKey: '',
	address: '',
	walletId: null,
	network: defaultNetwork,
	transactions: []
};

export const fetchTokensAndBalances = async (privateKey: string, address: string) => {
	const blockchain = await selectedNetwork();
	const walletObj = new Wallet(privateKey, await getProvider(blockchain.id));
	const eth = await walletObj.getBalance();
	const { balance: balanceUSD } = await getTokenBalances({ address, chainId: blockchain.chainId });

	const balance = {
		eth,
		usd: balanceUSD
	};

	return { balance, network: blockchain };
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
	const wallet = find(wallets, (w: MinkeWallet) => w.primary);
	return walletState(wallet as MinkeWallet);
};

const globalStateInit = createState(initializeWallet);

export function globalWalletState() {
	return globalStateInit;
}
