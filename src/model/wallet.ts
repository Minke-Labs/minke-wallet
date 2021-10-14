import {Wallet} from "ethers";
import {generateMnemonic, mnemonicToSeed} from "bip39";
import {ACCESSIBLE} from "react-native-keychain";
import {loadObject, saveObject} from "./keychain";
import {deleteItemAsync, SecureStoreOptions, setItemAsync, WHEN_UNLOCKED} from "expo-secure-store";

export const publicAccessControlOptions: SecureStoreOptions = {
    keychainAccessible: WHEN_UNLOCKED,
};

export const walletCreate = async (): Promise<null | MinkeWallet> => {
    const mnemonic = generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    const wallet: Wallet = new Wallet(seed);
    const id = `wallet_${Date.now()}`;
    await saveSeedPhrase(mnemonic, id);
    await saveAddress(wallet.address);
    await savePrivateKey(wallet.address, wallet.privateKey);
    console.log(wallet, wallet.privateKey, wallet.address);
    const newWallet: MinkeWallet = {id, address: wallet.address, wallet}
    const existingWallets = await getAllWallets() || {};
    existingWallets[id] = newWallet;
    await saveAllWallets(existingWallets)
    return newWallet


}

export const purgeWallets = () => {
  return deleteItemAsync('minkeAllWallets');
}

export const getAllWallets = async (): Promise<null | AllMinkeWallets> => {
    try {
        const allWallets = await loadObject('minkeAllWallets');
        console.log(allWallets)
        if (allWallets) {
            return allWallets as AllMinkeWallets;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const saveAllWallets = async (wallets: AllMinkeWallets) => {

    await saveObject('minkeAllWallets', wallets, publicAccessControlOptions);
};

export const saveSeedPhrase = async (
    seedPhrase: string,
    keychain_id: MinkeWallet['id']
): Promise<void> => {

    const key = `${keychain_id}_minkeSeedPhrase`;
    const val = {
        id: keychain_id,
        seedPhrase
    };

    return saveObject(key, val, publicAccessControlOptions);
};

export const saveAddress = async (
    address: string,
    accessControlOptions = publicAccessControlOptions
): Promise<void> => {
    return setItemAsync('minkeAddressKey', address, accessControlOptions);
};

export const savePrivateKey = async (
  address: string,
  privateKey: null | string
) => {
  // const privateAccessControlOptions = await getPrivateAccessControlOptions();

  const key = `${address}_minkePrivateKey`;
  const val = {
    address,
    privateKey,
  };

  await saveObject(key, val, publicAccessControlOptions);
};
export interface MinkeWallet {
    id: string,
    address: string,
    wallet: Wallet
}

export interface AllMinkeWallets {
    [key: string]: MinkeWallet;
}
