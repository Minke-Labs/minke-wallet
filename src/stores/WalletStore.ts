import {createState} from "@hookstate/core";
import {
    erc20abi,
    getAllWallets,
    getEthLastPrice,
    getPrivateKey,
    MinkeTokenList,
    provider,
    supportedTokenList,
} from "../model/wallet";
import {find} from "lodash";
import {BigNumber, Contract, Wallet} from "ethers";
import {convertEthToUsd} from "../helpers/utilities";

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
    wallet: Wallet | null;
    tokens?: MinkeTokenList
    walletId?: string | null;
    balance?: {
        eth?: BigNumber
        usd?: string
    };
}

const initializeWallet = async (): Promise<WalletState> => {
    // const state = useState(globalWalletState);

    const wallets = await getAllWallets();
    const ethPrice = await getEthLastPrice();
    const wallet = find(wallets, wallet => wallet.primary);
    if (wallet) {
        const privateKey = await getPrivateKey(wallet.address);

        // console.log('PRIVATE KEY', privateKey)
        if (privateKey) {
            const eth = await provider.getBalance(wallet.address);
            const tokens: MinkeTokenList = {}
            Object.entries(supportedTokenList).forEach(([key, tokenAddress]) => {
                const contract = new Contract(tokenAddress, erc20abi, provider);
                contract.balanceOf(wallet.address).then((balance: BigNumber) => {
                    tokens[key] = {
                        contract,
                        balance
                    }
                })

            })
            const balance = {
                eth,
                // usd: undefined
                usd: convertEthToUsd(eth, ethPrice.result.ethusd)
            }
            return {wallet: new Wallet(privateKey, provider), walletId: wallet.id, balance, tokens}
        }
    }

    return {wallet: null, walletId: null}

}

const globalStateInit = createState(initializeWallet)

export function globalWalletState() {
    return globalStateInit;

}

