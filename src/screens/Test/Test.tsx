import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { TxBuilderV2, Network, Market, EthereumTransactionTypeExtended } from '@aave/protocol-js';
import { getProvider } from '@models/wallet';
import { Biconomy } from '@biconomy/mexa';
import { ethers, Wallet } from 'ethers';
import { globalWalletState } from '@stores/WalletStore';
import { parseUnits } from 'ethers/lib/utils';

const Test = () => {
	const test = async () => {
		const {
			privateKey,
			address,
			network: { chainId }
		} = globalWalletState().value;
		const lala = await getProvider();
		const biconomy = new Biconomy(lala, {
			apiKey: 'fny6DM1HC.2dd130ac-5d62-4907-af68-17568cb95634',
			debug: true
		});
		const provider = new ethers.providers.Web3Provider(biconomy);
		const wallet = new Wallet(privateKey, provider);
		const txBuilder = new TxBuilderV2(Network.polygon, provider);
		const lendingPool = txBuilder.getLendingPool(Market.Proto);

		const reserve = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'; // DAI, not amDAI
		const amount = '0.01';
		console.log({ amount });
		const result: EthereumTransactionTypeExtended[] = await lendingPool.deposit({
			user: address,
			reserve,
			amount,
			onBehalfOf: '0x5f5e3148532d1682866131a1971bb74a92d96376'
		});

		biconomy
			.onEvent(biconomy.READY, async () => {
				// Initialize your dapp here like getting user accounts etc
				const { tx } = result[0];
				const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
				let txDefaults;
				try {
					txDefaults = await tx();
				} catch ({ transaction }) {
					txDefaults = transaction;
				}

				console.log('pegou', txDefaults);
				delete txDefaults.accessList;
				const gasParams = {
					gasPrice: parseUnits('60', 'gwei'),
					gasLimit: 5000000
				};
				console.log({ txDefaults });
				const transaction = { nonce, chainId, ...txDefaults, ...gasParams };
				console.log({ transaction });
				const signedTx = await wallet.signTransaction(transaction);
				const { hash, wait } = await provider.sendTransaction(signedTx as string);
				if (hash) {
					console.log(hash);
					await wait();
					console.log('finished');
				}
			})
			.onEvent(biconomy.ERROR, (error: any, message: any) => {
				console.error({ error });
				console.log({ message });
			});
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test AAVE" onPress={test} marginBottom={8} />
			</View>
		</BasicLayout>
	);
};

export default Test;
