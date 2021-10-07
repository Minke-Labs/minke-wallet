import {Wallet} from "ethers";
import {generateMnemonic, mnemonicToSeed} from "bip39";
import {addHexPrefix} from "ethereumjs-util";

export const walletCreate = async (): Promise<null | Wallet> => {
    const mnemonic = generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    const wallet = new Wallet(seed);
    console.log(wallet);
    return  wallet
}
