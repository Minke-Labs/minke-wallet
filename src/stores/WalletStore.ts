/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createState } from '@hookstate/core';
import { defaultNetwork, Network, network as selectedNetwork } from '@src/model/network';
import { getAllWallets, getPrivateKey, MinkeWallet, saveAllWallets, ZapperTransaction } from '@models/wallet';
import { getTokenBalances } from '@src/services/apis';

export interface WalletState {
	privateKey: string | null;
	network: Network;
	address: string;
	walletId?: string | null;
	balance?: {
		usd?: number; // total
		depositedBalance?: number; // deposits
		walletBalance?: number; // total in the wallet (total - deposits)
	};
	transactions?: Array<ZapperTransaction>;
	backedUp: boolean;
}

export const emptyWallet: WalletState = {
	privateKey: '',
	address: '',
	walletId: null,
	network: defaultNetwork,
	transactions: [],
	backedUp: false
};

export const fetchTokensAndBalances = async (address: string) => {
	const blockchain = await selectedNetwork();
	const { balance: balanceUSD, walletBalance, depositedBalance } = await getTokenBalances(address);

	const balance = {
		usd: balanceUSD,
		walletBalance,
		depositedBalance
	};

	return { balance, network: blockchain };
};

const setPrimaryWallet = async (wallet: MinkeWallet): Promise<MinkeWallet> => {
	const allWallets = (await getAllWallets()) || {};
	const chosen = wallet;
	const primaryWallet = Object.values(allWallets).find(({ primary }) => primary);
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
		if (!wallet.primary) await setPrimaryWallet(wallet);
		const privateKey = await getPrivateKey(wallet.address);
		return {
			...{
				privateKey,
				address: wallet.address,
				walletId: wallet.id,
				allTokens: [],
				transactions: [],
				backedUp: wallet.backedUp
			},
			...(await fetchTokensAndBalances(wallet.address))
		};
	}
	return emptyWallet;
};

const initializeWallet = async (): Promise<WalletState> => {
	const wallets = Object.values((await getAllWallets()) || []);
	let wallet = wallets.find(({ primary }) => primary);
	if (wallets && !wallet) {
		[wallet] = Object.values(wallets);
	}
	return walletState(wallet as MinkeWallet);
};

const globalStateInit = createState(initializeWallet);

export function globalWalletState() {
	return globalStateInit;
}
