import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { BasicLayout } from '@layouts';
import { useBiconomy } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { toBn } from 'evm-bn';
import { formatUnits, Interface, parseUnits } from 'ethers/lib/utils';
import { getProvider } from '@models/wallet';
import { Contract, Wallet } from 'ethers';
import { signTypedDataV3 } from '@utils/signing/signing';

const Test = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const params = {
		withdrawContract: '0x32aBa856Dc5fFd5A56Bcd182b13380e5C855aa29', // v-imUSD
		output: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
		router: '0xE840B73E5287865EEc17d250bFb1536704B43B21', // mAsset
		amount: formatUnits(toBn('0.001', 18), 'wei'), // imUSD amount
		minAmount: formatUnits(toBn('0.0001', 18), 'wei'), // DAI min amount,
		gas: 200
	};

	const withdraw = useCallback(async () => {
		const abi = [
			// eslint-disable-next-line max-len
			'function withdrawAndUnwrap (uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut) external returns (uint256 outputQuantity)'
		];
		if (gaslessEnabled) {
			const contractInterface = new Interface(abi);

			const userSigner = new Wallet(privateKey);

			// Create your target method signature.. here we are calling setQuote() method of our contract
			const functionSignature = contractInterface.encodeFunctionData('withdrawAndUnwrap', [
				params.amount,
				params.minAmount,
				params.output,
				address,
				params.router,
				true
			]);

			const rawTx = {
				to: params.withdrawContract,
				data: functionSignature,
				from: address,
				gasLimit: 700000,
				gasPrice: parseUnits(params.gas.toString(), 'gwei')
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
			// send signed transaction with ethers
			// promise resolves to transaction hash
			const hash = await provider.send('eth_sendRawTransaction', [data]);
			console.log('finished withdraw without gas', hash);
		} else {
			const provider = await getProvider();
			const wallet = new Wallet(privateKey, provider);
			const nonce = await wallet.provider.getTransactionCount(wallet.address, 'latest');
			const chainId = await wallet.getChainId();
			const txDefaults = {
				chainId,
				to: params.withdrawContract,
				gasPrice: parseUnits(params.gas.toString(), 'gwei'),
				gasLimit: 700000,
				nonce
			};

			// const signer = provider.getSigner(wallet.address)

			const erc20 = new Contract(params.withdrawContract, abi, wallet.provider);
			const tx = await erc20.populateTransaction.withdrawAndUnwrap(
				params.amount,
				params.minAmount,
				params.output,
				address,
				params.router,
				true
			);

			const signedTx = await wallet.signTransaction({ ...txDefaults, ...tx });
			const { hash } = await wallet.provider.sendTransaction(signedTx as string);

			console.log('finished withdraw with gas', hash);
		}
	}, [gaslessEnabled, biconomy, address, privateKey]);

	const test = async () => {
		console.log('started');
		await withdraw();
		console.log('done');
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test" onPress={test} marginBottom={48} />
				{!!gaslessEnabled && <Text>GASLESS</Text>}
			</View>
		</BasicLayout>
	);
};

export default Test;
