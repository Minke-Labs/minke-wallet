import { createState } from '@hookstate/core';
import { find } from 'lodash';
import { BigNumber, Contract, Wallet } from 'ethers';
import { convertEthToUsd } from '@helpers/utilities';
import { defaultNetwork, Network, network as selectedNetwork } from '@models/network';
import {
	erc20abi,
	getAllWallets,
	getEthLastPrice,
	getPrivateKey,
	getProvider,
	MinkeTokenList,
	MinkeWallet
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
}

export const emptyWallet = { privateKey: '', address: '', walletId: null, network: defaultNetwork };

export const fetchTokensAndBalances = async (privateKey: string, address: string) => {
	const blockchain = await selectedNetwork();
	const walletObj = new Wallet(privateKey, await getProvider(blockchain.id));
	const eth = await walletObj.getBalance();
	const tokens: MinkeTokenList = {};

	for (const [key, tokenAddress] of Object.entries(blockchain.supportedTokenList || [])) {
		const contract = new Contract(tokenAddress, erc20abi, walletObj.provider);
		const balance = await contract.balanceOf(address);
		tokens[key] = {
			contract,
			balance
		};
	}

	const ethPrice = await getEthLastPrice();
	const balance = {
		eth,
		usd: convertEthToUsd(eth, (Math.trunc(+ethPrice.result.ethusd * 100) / 100).toString())
	};

	return { tokens, balance, network: blockchain };
};

export const walletState = async (wallet: MinkeWallet | undefined) => {
	if (wallet) {
		const privateKey = await getPrivateKey(wallet.address);

		if (privateKey) {
			return {
				...{ privateKey, address: wallet.address, walletId: wallet.id },
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
