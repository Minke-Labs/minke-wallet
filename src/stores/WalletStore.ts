import {createState} from "@hookstate/core";
import {getAllWallets, getPrivateKey} from "../model/wallet";
import {find} from "lodash";
import {Wallet} from "ethers";

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


export const globalWalletState = createState<WalletState>({wallet: null})


export interface WalletState {
    wallet: Wallet | null;
    walletId?: string | null;
}

export const initializeWallet = async () => {
    // const state = useState(globalWalletState);

     const wallets = await getAllWallets();

    const wallet = find(wallets, wallet => wallet.primary);
    if(wallet) {
        const privateKey = await getPrivateKey(wallet.address);
       return {id: wallet.id, privateKey}
    }

    return null

}
