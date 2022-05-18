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
import { mStableGaslessWithdraw } from '@src/services/deposit/mStable';

const Test = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const params = {
		interestToken: '0x8fC81a10Aa4843d80e6Fe46Ee6aE0fD61f35FA25',
		withdrawContract: networks.matic.mStable?.withdrawContract!, // v-imUSD
		output: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
		// output: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
		// output: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
		router: '0xE840B73E5287865EEc17d250bFb1536704B43B21', // mAsset
		amount: formatUnits(toBn('9.03689653940166851', 18), 'wei'), // always 18 - interestToken amount
		minAmount: formatUnits(toBn('0.60', 18), 'wei'), // return min amount,
		gas: 70
	};

	const approve = useCallback(async () => {
		const { isApproved } = await approvalState(address, params.interestToken, params.withdrawContract);
		console.log({ isApproved });
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
					await approvalTransaction.wait(1);
				}

				console.log('gas approval transaction', approvalTransaction?.hash);
			}
		}
	}, [gaslessEnabled, biconomy, address, privateKey]);

	const withdraw = useCallback(async () => {
		if (gaslessEnabled) {
			const hash = await mStableGaslessWithdraw({
				address,
				privateKey,
				amount: params.amount,
				minAmount: params.minAmount,
				token: params.output,
				gasPrice: params.gas.toString(),
				biconomy,
				router: params.router
			});
			console.log('Gasless withdraw', hash);
		} else {
			const abi = [
				// eslint-disable-next-line max-len
				'function withdrawAndUnwrap(uint256 _amount, uint256 _minAmountOut, address _output, address _beneficiary, address _router, bool _isBassetOut, bytes calldata _permitSig) external returns (uint256 outputQuantity)'
			];
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
		console.log('started, approving...');
		await approve();
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
