import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { TxBuilderV2, Network, Market, EthereumTransactionTypeExtended } from '@aave/protocol-js';
import { getProvider } from '@models/wallet';
import { Biconomy } from '@biconomy/mexa';
import { ethers, Wallet } from 'ethers';
import { globalWalletState } from '@stores/WalletStore';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { approvalTransaction, depositTransaction } from '@models/deposit';
import { approveSpending, depositTest } from '@models/contract';
import { toBn } from 'evm-bn';

const Test = () => {
	const test = async () => {
		const {
			privateKey,
			address,
			network: { chainId }
		} = globalWalletState().value;

		const url = 'https://polygon-mainnet.g.alchemy.com/v2/oCWOrhTijsp7Ir1Qm9If2xxWgNa_YIcV';
		const walletProvider = new ethers.providers.JsonRpcProvider(url);
		const biconomy = new Biconomy(walletProvider, {
			apiKey: 'fny6DM1HC.2dd130ac-5d62-4907-af68-17568cb95634',
			debug: true
		});
		const provider = new ethers.providers.Web3Provider(biconomy);

		biconomy
			.onEvent(biconomy.READY, async () => {
				const token = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
				const interestBearingToken = '0x1a13f4ca1d028320a707d99520abfefca3998b7f'; // amUSDC
				const decimals = 6;
				const amount = formatUnits(toBn('0.01', decimals), 'wei');
				const minAmount = formatUnits(toBn('0.001', decimals), 'wei');
				const spender = '0x21cd021e578532e2d55bcb1105d1766be1f1736a';
				const gweiValue = 50 * 1000000000;

				const {
					approvalTransaction: { hash: approvalHash, wait: approvalWait }
				} = await approveSpending({
					userAddress: address,
					amount,
					contractAddress: token,
					privateKey,
					spender,
					gasPrice: gweiValue
				});
				console.log('allowed: ', approvalHash);
				await approvalWait();
				console.log('finished approval');

				const abi = [
					// eslint-disable-next-line max-len
					'function ZapIn(address fromToken, uint256 amountIn, address aToken, uint256 minATokens, address swapTarget, bytes calldata swapData, address affiliate) external payable returns (uint256 aTokensRec)'
				];

				// Initialize Constants
				const contract = new ethers.Contract(spender, abi, biconomy.getSignerByAddress(address));

				const contractInterface = new ethers.utils.Interface(abi);

				const userAddress = address;

				// Create your target method signature.. here we are calling setQuote() method of our contract
				const { data } = await contract.populateTransaction.ZapIn(
					token,
					amount,
					interestBearingToken,
					minAmount,
					'0x0000000000000000000000000000000000000000',
					'0x00',
					'0x3CE37278de6388532C3949ce4e886F365B14fB56'
				);
				const lala = biconomy.getEthersProvider();

				const gasLimit = await lala.estimateGas({
					to: spender,
					from: userAddress,
					data
				});

				console.log('Gas limit : ', gasLimit);

				const txParams = {
					data,
					to: spender,
					from: userAddress,
					gasLimit, // optional
					signatureType: 'EIP712_SIGN'
				};

				// as ethers does not allow providing custom options while sending transaction
				const tx = await lala.send('eth_sendTransaction', [txParams]);
				console.log('Transaction hash : ', tx);

				// event emitter methods
				lala.once(tx, (transaction) => {
					// Emitted when the transaction has been mined
					// show success message
					console.log(transaction);
					// do something with transaction hash
				});

				// const txDefaults = await depositTransaction({
				// 	address,
				// 	amount,
				// 	decimals,
				// 	gweiValue,
				// 	interestBearingToken,
				// 	token
				// });

				// console.log(txDefaults);

				// const transaction = { nonce, chainId, ...txDefaults };
				// const signedTx = await wallet.signTransaction(transaction);
				// const hash = await ethersProvider.sendTransaction(signedTx as string);
				// if (hash) {
				// 	console.log(hash);
				// 	console.log('finished');
				// }
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
