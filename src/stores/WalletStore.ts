import {createState, useState} from "@hookstate/core";
import {AllMinkeWallets, getAllWallets, MinkeWallet} from "../model/wallet";
import {isNull} from "lodash";

export const initWallet = getAllWallets().then(wallets => {
    // console.log(wallets)
        return {
            selectedWallet: isNull(wallets) ? wallets : wallets[0],
            wallets
        }
    });
    // const selectedWallet = isNull(wallets) ? wallets : wallets[0];
    // walletState.set({
    //     selectedWallet,
    //     wallets
    // })



const walletState = createState<WalletState>(initWallet)

export const useWalletState = () => {
    return useState<WalletState>(walletState);
}

export interface WalletState {
    selectedWallet: MinkeWallet | null,
    wallets: AllMinkeWallets | null
}
