import { createState } from '@hookstate/core';
import { find } from 'lodash';
import { BigNumber, Contract, Wallet } from 'ethers';
import { convertEthToUsd } from '@helpers/utilities';
import { defaultNetwork, Network, network } from '@models/network';
import {
	erc20abi,
	getAllWallets,
	getEthLastPrice,
	getPrivateKey,
	getProvider,
	MinkeTokenList,
	supportedTokenList
} from '@models/wallet';

/*export const initWallet = getAllWallets().then(wallets => {

    const wallet = find(wallets as)
    return {
        wallet: find(wallets) as MinkeWallet,
    }
});*/
// const selectedWallet = isNull(wallets) ? wallets : wallets[0];
// walletState.set({
//     selectedWallet,
//     wallets
// })

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

const initializeWallet = async (): Promise<WalletState> => {
	// const state = useState(globalWalletState);

	const wallets = await getAllWallets();
	const ethPrice = await getEthLastPrice();
	const wallet = find(wallets, (w) => w.primary);
	if (wallet) {
		const privateKey = await getPrivateKey(wallet.address);

		// console.log('PRIVATE KEY', privateKey)
		if (privateKey) {
			const walletObj = new Wallet(privateKey, await getProvider());
			const eth = await walletObj.getBalance();
			const tokens: MinkeTokenList = {};

			for (const [key, tokenAddress] of Object.entries(supportedTokenList)) {
				const contract = new Contract(tokenAddress, erc20abi, walletObj.provider);
				const balance = await contract.balanceOf(wallet.address);
				tokens[key] = {
					contract,
					balance
				};
			}

			const balance = {
				eth,
				// usd: undefined
				usd: convertEthToUsd(eth, ethPrice.result.ethusd)
			};

			return {
				privateKey,
				network: await network(),
				address: wallet.address,
				// wallet: walletObj,
				walletId: wallet.id,
				balance,
				tokens
			};
		}
	}

	return { privateKey: '', address: '', walletId: null, network: defaultNetwork };
};

const globalStateInit = createState(initializeWallet);

export function globalWalletState() {
	return globalStateInit;
}
