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
import { approvalState } from '@models/deposit';
import { gaslessApproval } from '@models/gaslessTransaction';
import { approveSpending } from '@models/contract';
import { networks } from '@models/network';

const Test = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const params = {
		interestToken: '0x0168560488ebfd72ad3a152bae1c675ef3b1e31a',
		withdrawContract: networks.matic.mStable?.depositContract!, // v-imUSD
		// output: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
		// output: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
		output: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
		router: '0xE840B73E5287865EEc17d250bFb1536704B43B21', // mAsset
		amount: formatUnits(toBn('3.190124521480855464', 18), 'wei'), // always 18 - interestToken amount
		minAmount: formatUnits(toBn('0.0001', 6), 'wei'), // return min amount,
		gas: 70
	};

	const approve = useCallback(async () => {
		const { isApproved } = await approvalState(address, params.interestToken, params.withdrawContract);
		if (!isApproved) {
			if (gaslessEnabled) {
				const tx = await gaslessApproval({
					address,
					biconomy,
					contract: params.interestToken,
					privateKey,
					spender: params.withdrawContract
				});

				await biconomy.getEthersProvider().waitForTransaction(tx, 3);

				console.log('Gasless approval ', tx);
			} else {
				const { transaction: approvalTransaction } = await approveSpending({
					contractAddress: params.interestToken,
					spender: params.withdrawContract,
					gasPrice: params.gas * 1000000000,
					privateKey,
					userAddress: address
				});

				if (approvalTransaction) {
					await approvalTransaction.wait(3);
				}

				console.log('gas approval transaction', approvalTransaction?.hash);
			}
		}
	}, [gaslessEnabled, biconomy, address, privateKey]);

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
				gasLimit: 800000,
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
				gasLimit: 800000,
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
		await approve();
		console.log('approved');
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
