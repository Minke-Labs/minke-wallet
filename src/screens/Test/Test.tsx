import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { Biconomy } from '@biconomy/mexa';
import { ethers, Wallet } from 'ethers';
import { globalWalletState } from '@stores/WalletStore';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { getProvider } from '@models/wallet';
import { signTypedData } from '@metamask/eth-sig-util';
import { approveSpending } from '@models/contract';

const Test = () => {
	const test = async () => {
		const {
			privateKey,
			address,
			network: { chainId }
		} = globalWalletState().value;

		const url = 'https://polygon-mainnet.g.alchemy.com/v2/oCWOrhTijsp7Ir1Qm9If2xxWgNa_YIcV';
		const alchemy = new ethers.providers.JsonRpcProvider(url);
		const biconomy = new Biconomy(alchemy, {
			apiKey: 'fny6DM1HC.2dd130ac-5d62-4907-af68-17568cb95634',
			debug: true
		});

		biconomy
			.onEvent(biconomy.READY, async () => {
				const token = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
				const interestBearingToken = '0x1a13f4ca1d028320a707d99520abfefca3998b7f'; // amUSDC
				const decimals = 6;
				const amount = formatUnits(toBn('0.01', decimals), 'wei');
				const minAmount = formatUnits(toBn('0.001', decimals), 'wei');
				const contractAddress = '0x21cd021e578532e2d55bcb1105d1766be1f1736a';
				const forwarderContractAddress = '';
				const gasPrice = '100';

				// const {
				// 	approvalTransaction: { hash: approvalHash, wait: approvalWait }
				// } = await approveSpending({
				// 	userAddress: address,
				// 	amount,
				// 	contractAddress: token,
				// 	privateKey,
				// 	spender: contractAddress,
				// 	gasPrice
				// });
				// console.log('allowed: ', approvalHash);
				// await approvalWait();
				// console.log('finished approval');

				const abi = [
					// eslint-disable-next-line max-len
					'function ZapIn(address fromToken, uint256 amountIn, address aToken, uint256 minATokens, address swapTarget, bytes calldata swapData, address affiliate) external payable returns (uint256 aTokensRec)'
				];

				const contract = new ethers.Contract(contractAddress, abi, biconomy.getSignerByAddress(address));

				// const { data } = await contract.populateTransaction.ZapIn(
				// 	token,
				// 	amount,
				// 	interestBearingToken,
				// 	minAmount,
				// 	'0x0000000000000000000000000000000000000000',
				// 	'0x00',
				// 	'0x3CE37278de6388532C3949ce4e886F365B14fB56'
				// );

				// const transaction = {
				// 	type: 2,
				// 	from: address,
				// 	to: contractAddress,
				// 	chainId,
				// 	data,
				// 	nonce,
				// 	gasLimit: 500000,
				// 	maxFeePerGas: gasPrice.toString(),
				// 	maxPriorityFeePerGas: gasPrice.toString(),
				// 	signatureType: 'EIP712_SIGN'
				// };
				// console.log('transaction', transaction);

				const contractInterface = new ethers.utils.Interface(abi);

				const userSigner = new ethers.Wallet(privateKey);

				// Create your target method signature.. here we are calling setQuote() method of our contract
				const functionSignature = contractInterface.encodeFunctionData('ZapIn', [
					token,
					amount,
					interestBearingToken,
					minAmount,
					'0x0000000000000000000000000000000000000000',
					'0x00',
					'0x3CE37278de6388532C3949ce4e886F365B14fB56'
				]);

				const rawTx = {
					to: contractAddress,
					data: functionSignature,
					from: address,
					gasLimit: 500000,
					gasPrice: parseUnits(gasPrice, 'gwei')
				};

				console.log({ rawTx });

				console.log('gonna sign the transaction');

				const signedTx = await userSigner.signTransaction(rawTx);
				console.log({ signedTx });
				// should get user message to sign for EIP712 or personal signature types
				const forwardData = await biconomy.getForwardRequestAndMessageToSign(signedTx);
				console.log({ forwardData });

				// optionally one can sign using sigUtil
				const signature = signTypedData({
					privateKey: new Buffer.from(
						'e9b2903d977360fc7ed552e2dd33aa64ceea082d11965c7262bd2686282a6a04',
						'hex'
					),
					data: forwardData.eip712Format,
					version: 'V3'
				});

				const data = {
					signature,
					forwardRequest: forwardData.request,
					rawTransaction: signedTx,
					signatureType: biconomy.EIP712_SIGN
				};

				const provider = biconomy.getEthersProvider();
				// send signed transaction with ethers
				// promise resolves to transaction hash
				const txHash = await provider.send('eth_sendRawTransaction', [data]);
				console.log(txHash);

				const receipt = await provider.waitForTransaction(txHash);

				console.log('Finished', receipt);
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
