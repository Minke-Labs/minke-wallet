import React from 'react';
import { Button, Text, View } from '@components';
import { BasicLayout } from '@layouts';
import { useBiconomy, useGlobalWalletState } from '@hooks';
import { gaslessTransactionData } from '@utils/signing/signing';
import { Wallet } from 'ethers';
import Logger from '@utils/logger';

const Test = () => {
	const { address, privateKey, network } = useGlobalWalletState();
	const { biconomy } = useBiconomy();

	const test = async () => {
		const provider = biconomy.getEthersProvider();
		const contract = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
		const amount = '100000000';
		const data = await gaslessTransactionData({
			userAddress: address,
			contract,
			privateKey: privateKey!,
			amount,
			provider,
			spender: '0xe0eE7Fec8eC7eB5e88f1DbBFE3E0681cC49F6499'
		});

		const rawTx = {
			to: contract,
			data,
			from: address,
			gasLimit: 500000
		};
		const wallet = new Wallet(privateKey!, provider);
		const tx = await wallet.signTransaction(rawTx);
		let transactionHash;
		try {
			Logger.log('Transaction', tx);
			Logger.log('Is provider ready?', !!provider);
			await provider.sendTransaction(tx);
		} catch (error: any) {
			// Ethers check the hash from user's signed tx and hash returned from Biconomy
			// Both hash are expected to be different as biconomy send the transaction from its relayers
			if (error.returnedHash && error.expectedHash) {
				transactionHash = error.returnedHash;
				Logger.log('Transaction done', transactionHash);
			} else {
				Logger.error('Error on gasless approval transaction', error);
			}
		}
	};

	return (
		<BasicLayout>
			<View p="s">
				<Button title="Execute transaction" onPress={test} mb="s" />
				<Text>{address}</Text>
				<Text>{network.name}</Text>
			</View>
		</BasicLayout>
	);
};

export default Test;
