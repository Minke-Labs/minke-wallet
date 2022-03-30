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

		const url = 'https://polygon-mainnet.g.alchemy.com/v2/oCWOrhTijsp7Ir1Qm9If2xxWgNa_YIcV';
		const provider = new ethers.providers.JsonRpcProvider(url);
		const biconomy = new Biconomy(provider, {
			apiKey: 'fny6DM1HC.2dd130ac-5d62-4907-af68-17568cb95634',
			debug: true
		});

		biconomy
			.onEvent(biconomy.READY, async () => {
				const ethersProvider = new ethers.providers.Web3Provider(biconomy);
				const wallet = new Wallet(privateKey, ethersProvider);
				const txBuilder = new TxBuilderV2(Network.polygon, provider);
				const lendingPool = txBuilder.getLendingPool(Market.Proto);

				const reserve = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'; // DAI, not amDAI
				const amount = '0.01';
				// Initialize your dapp here like getting user accounts etc
				const result: EthereumTransactionTypeExtended[] = await lendingPool.deposit({
					user: address,
					reserve,
					amount,
					onBehalfOf: '0x5f5e3148532d1682866131a1971bb74a92d96376'
				});
				const { tx } = result[0];
				const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
				let txDefaults = {};
				try {
					txDefaults = await tx();
				} catch ({ transaction }) {
					txDefaults = transaction;
				}

				delete txDefaults.accessList;
				// const gasParams = {
				// 	gasPrice: parseUnits('60', 'gwei'),
				// 	gasLimit: 5000000
				// };
				const transaction = { nonce, chainId, ...txDefaults };
				const signedTx = await wallet.signTransaction(transaction);
				const hash = await ethersProvider.sendTransaction(signedTx as string);
				if (hash) {
					console.log(hash);
					console.log('finished');
				}
			})
			.onEvent(biconomy.ERROR, (error: any, message: any) => {
				console.log('Error');
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
