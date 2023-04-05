import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
import { BigNumber, constants, Contract, Wallet } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

import { ALCHEMY_API_KEY_MATIC } from '@env';
import { networks } from '@models/network';
import { getProvider } from '@models/wallet';
import Logger from '@utils/logger';
import { signTypedDataV3 } from '@utils/signing/signing';

import useBiconomy from './useBiconomy';
import useGlobalWalletState from './useGlobalWalletState';

const NFT_ADDRESS = '0x8629026081bA6Bd0eb195Ee2AA1D6629Dd9D2D91';
const ABI = [
	{
		inputs: [],
		name: 'mint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];

const useMinkeNFT = () => {
	const { address, privateKey } = useGlobalWalletState();
	const [minted, setMinted] = useState<boolean>();
	const [tokens, setTokens] = useState<OwnedNft[]>([]);
	const { biconomy, gaslessEnabledMatic } = useBiconomy();

	useEffect(() => {
		const checkMinted = async () => {
			const provider = getProvider(networks.matic.id);
			const contract = new Contract(NFT_ADDRESS, ABI, provider);

			const mintedCount: BigNumber = await contract.balanceOf(address);
			setMinted(!mintedCount.eq(constants.Zero));
		};

		checkMinted();
	}, [address]);

	const fetchTokens = async () => {
		const settings = {
			apiKey: ALCHEMY_API_KEY_MATIC || process.env.ALCHEMY_API_KEY_MATIC,
			network: Network.MATIC_MAINNET
		};
		const alchemy = new Alchemy(settings);
		const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
			omitMetadata: false,
			contractAddresses: [NFT_ADDRESS]
		});

		setTokens(ownedNfts);
	};

	useEffect(() => {
		if (minted) {
			fetchTokens();
		}
	}, [address, minted]);

	const mint = async (): Promise<string | null> => {
		if (!privateKey) return null;

		const userSigner = new Wallet(privateKey);
		if (gaslessEnabledMatic) {
			const contractInterface = new Interface(ABI);

			// Create your target method signature.. here we are calling setQuote() method of our contract
			const functionSignature = contractInterface.encodeFunctionData('mint');
			const alchemyProvider = getProvider(networks.matic.id);

			const rawTx = {
				to: NFT_ADDRESS,
				data: functionSignature,
				from: address,
				gasLimit: 5000000,
				gasPrice: await alchemyProvider.getGasPrice()
			};

			const signedTx = await userSigner.signTransaction(rawTx);
			// should get user message to sign for EIP712 or personal signature types
			const forwardData = await biconomy.getForwardRequestAndMessageToSign(signedTx);

			const signature = signTypedDataV3({ privateKey, data: forwardData.eip712Format });

			const data = {
				signature,
				forwardRequest: forwardData.request,
				rawTransaction: signedTx,
				signatureType: biconomy.EIP712_SIGN
			};

			const provider = biconomy.getEthersProvider();
			// promise resolves to transaction hash
			try {
				const hash: string = await provider.send('eth_sendRawTransaction', [data]);
				await provider.waitForTransaction(hash);
				setMinted(true);
				return hash;
			} catch (error) {
				Logger.error('NFT Mint Error', error);
				return null;
			}
		}

		const provider = getProvider(networks.matic.id);
		const contract = new Contract(NFT_ADDRESS, ABI, provider);

		const txDefaults = {
			from: address,
			to: NFT_ADDRESS,
			gasLimit: '200000',
			gasPrice: await provider.getGasPrice()
		};

		const tx = await contract.populateTransaction.mint();
		const signedTx = await userSigner.signTransaction({ ...txDefaults, ...tx });
		const transaction = await provider.sendTransaction(signedTx as string);
		await provider.waitForTransaction(transaction.hash);
		setMinted(true);
		return transaction.hash;
	};

	return { minted, mint, token: tokens[0] };
};
export default useMinkeNFT;
