import {createState, useState} from "@hookstate/core";
import {getAllWallets, getEthLastPrice, getPrivateKey, provider} from "../model/wallet";
import {find} from "lodash";
import {BigNumber, BigNumberish, FixedNumber, Wallet} from "ethers";
import {ViewToken} from "react-native";
import {formatEther, formatUnits, parseUnits} from "ethers/lib/utils";
import {formatFixed} from "@ethersproject/bignumber";
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
    if(wallet) {
        const privateKey = await getPrivateKey(wallet.address);

        // console.log('PRIVATE KEY', privateKey)
        if(privateKey) {
            const eth = await provider.getBalance(wallet.address);

            const balance = {
                eth,
                // usd: undefined
                usd: convertEthToUsd(eth, ethPrice.result.ethusd)
            }
            return {wallet: new Wallet(privateKey, provider), walletId: wallet.id, balance}
        }
    }

    return {wallet: null, walletId: null}

}

const globalStateInit = createState(initializeWallet)
export function globalWalletState() {
    return globalStateInit;

}

