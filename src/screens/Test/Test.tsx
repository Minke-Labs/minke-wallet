import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { BasicLayout } from '@layouts';
import { gaslessApproval, gaslessMStableDeposit } from '@models/gaslessTransaction';
import { useBiconomy } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { toBn } from 'evm-bn';
import { formatUnits } from 'ethers/lib/utils';
import { approvalState } from '@models/deposit';
import { approveSpending } from '@models/contract';
import { mStableDeposit, mStableDepositContract } from '@src/services/deposit/mStable';

const Test = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const params = {
		// deposit: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
		deposit: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
		amount: formatUnits(toBn('0.001', 6), 'wei'),
		minAmount: formatUnits(toBn('0.0001', 18), 'wei'),
		gas: 50
	};

	const approve = useCallback(async () => {
		const { isApproved } = await approvalState(address, params.deposit, mStableDepositContract);
		if (!isApproved) {
			if (gaslessEnabled) {
				const tx = await gaslessApproval({
					address,
					biconomy,
					contract: params.deposit,
					privateKey,
					spender: mStableDepositContract
				});

				await biconomy.getEthersProvider().waitForTransaction(tx, 3);

				console.log('Gasless approval ', tx);
			} else {
				const { transaction: approvalTransaction } = await approveSpending({
					contractAddress: params.deposit,
					spender: mStableDepositContract,
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

	const quote = useCallback(async () => {
		if (gaslessEnabled) {
			const hash = await gaslessMStableDeposit({
				address,
				privateKey,
				token: params.deposit,
				amount: params.amount,
				minAmount: params.minAmount,
				gasPrice: params.gas.toString(),
				biconomy
			});
			console.log('finished gasless deposit with gas', hash);
		} else {
			const { hash } = await mStableDeposit({
				token: params.deposit,
				amount: params.amount,
				minAmount: params.minAmount,
				gasPrice: params.gas.toString(),
				privateKey
			});
			console.log('finished deposit with gas', hash);
		}
	}, [gaslessEnabled, biconomy, address, privateKey]);

	const test = async () => {
		console.log('started');
		await approve();
		console.log('approved');
		await quote();
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
