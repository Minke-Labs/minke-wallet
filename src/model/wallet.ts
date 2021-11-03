import {Wallet, providers, BigNumberish} from "ethers";
import {generateMnemonic, mnemonicToSeed} from "bip39";
import {loadObject, saveObject} from "./keychain";
import {deleteItemAsync, SecureStoreOptions, WHEN_UNLOCKED} from "expo-secure-store";
import {forEach, isEmpty} from "lodash";
import {parseEther} from "ethers/lib/utils";

export const publicAccessControlOptions: SecureStoreOptions = {
    keychainAccessible: WHEN_UNLOCKED,
};

export const walletCreate = async (): Promise<null | {wallet: Wallet; walletId: string, balance: BigNumberish}> => {
    const mnemonic = generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    const wallet: Wallet = new Wallet(seed, provider);
    const id = `wallet_${Date.now()}`;
    await saveSeedPhrase(mnemonic, id);
    await savePrivateKey(wallet.address, wallet.privateKey);
    console.log(wallet, wallet.privateKey, wallet.address);
    const newWallet: MinkeWallet = {id, address: wallet.address, name: '', primary: false}
    const existingWallets = await getAllWallets() || {};
    if(isEmpty(existingWallets)) {
        newWallet.primary = true;
    }
    existingWallets[id] = newWallet;
    await saveAllWallets(existingWallets);
    const balance = await provider.getBalance(wallet.address);
    return {wallet, walletId: id, balance}
}


export const purgeWallets = () => {
    return deleteItemAsync('minkeAllWallets');
}

export const walletDelete = async (id: string): Promise<boolean> => {
    const allWallets = await getAllWallets() || {};
    if(allWallets[id]) {
        delete allWallets[id];
        console.log('aaaaaaaaaaaa', allWallets);
        await saveAllWallets(allWallets || {});
        return true;
    }

    return false;
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
    } as SeedPhraseData;

    return await saveObject(key, val, publicAccessControlOptions);
};

export const getSeedPhrase = async (
    keychain_id: string
): Promise<string | null> => {
        const key = `${keychain_id}_minkeSeedPhrase`;

    const seedData = await loadObject(key) as SeedPhraseData;
    if(seedData?.seedPhrase) {
        return seedData.seedPhrase;
    }
    return null

}

export const getPrivateKey = async (
    address: string
): Promise<string | null> => {
        const key = `${address}_minkePrivateKey`;

    const pkey = await loadObject(key) as PrivateKeyData;
    if(pkey?.privateKey) {
        return pkey.privateKey;
    }
    return null

}

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


export const provider = new providers.InfuraProvider("ropsten", {
    projectId: '20d883398faf4226ad3f049ffcd83654',
    projectSecret: 'dd052da74d0749e2a0574f4eb4b22898'
});

export const sendTransaction = async (address: string, to: string, amount: string) => {
    const signer = provider.getSigner(address)
    return signer.sendTransaction({
        to,
        value: parseEther(amount)
    })
}


export interface MinkeWallet {
    id: string,
    address: string,
    name: string,
    primary: boolean
}

export interface AllMinkeWallets {
    [key: string]: MinkeWallet;
}
export interface PrivateKeyData {
    address: string;
    privateKey: string;
}
export interface SeedPhraseData {
    id: string;
    seedPhrase: string;
}
