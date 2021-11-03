import {createState, useState} from "@hookstate/core";
import {getAllWallets, getPrivateKey, provider} from "../model/wallet";
import {find} from "lodash";
import {BigNumber, BigNumberish, Wallet} from "ethers";
import {ViewToken} from "react-native";

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
    balance?: BigNumber;
}

const initializeWallet = async (): Promise<WalletState> => {
    // const state = useState(globalWalletState);

     const wallets = await getAllWallets();

    const wallet = find(wallets, wallet => wallet.primary);
    if(wallet) {
        const privateKey = await getPrivateKey(wallet.address);

        if(privateKey) {
            const balance = await provider.getBalance(wallet.address);
            return {wallet: new Wallet(privateKey, provider), walletId: wallet.id, balance}
        }
    }

    return {wallet: null, walletId: null}

}

const globalStateInit = createState(initializeWallet)
export function globalWalletState() {
    return globalStateInit;

}

