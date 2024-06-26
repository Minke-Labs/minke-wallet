/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createState } from '@hookstate/core';
import { defaultNetwork, Network, selectedNetwork } from '@src/model/network';
import {
	getAllWallets,
	getPrivateKey,
	getTokenList,
	MinkeWallet,
	saveAllWallets,
	ZapperTransaction
} from '@models/wallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import coins from '../utils/files/coins.json';

export interface WalletState {
	privateKey: string | null;
	network: Network;
	address: string;
	walletId?: string | null;
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
				backedUp: wallet.backedUp,
				network: await selectedNetwork()
			}
		};
	}
	return emptyWallet;
};

const getCoinList = async () => {
	try {
		const data = await getTokenList();
		// @ts-ignore
		const error = !!data.status;
		if (error) {
			await AsyncStorage.setItem('@listCoins', JSON.stringify(coins));
			return coins;
		}
		await AsyncStorage.setItem('@listCoins', JSON.stringify(data));
		return data;
	} catch (error) {
		await AsyncStorage.setItem('@listCoins', JSON.stringify(coins));
		return coins;
	}
};

const initializeWallet = async (): Promise<WalletState> => {
	await getCoinList();
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
