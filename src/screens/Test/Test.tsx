import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { BasicLayout } from '@layouts';
import { gaslessApproval, gaslessMStableDeposit, mStableDepositContract } from '@models/gaslessTransaction';
import { useBiconomy } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { toBn } from 'evm-bn';
import { formatUnits } from 'ethers/lib/utils';
import { approvalState } from '@models/deposit';
import { approveSpending } from '@models/contract';

const Test = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const params = {
		deposit: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
		amount: formatUnits(toBn('0.001', 18), 'wei'),
		minAmount: formatUnits(toBn('0.0001', 18), 'wei')
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

				console.log('Approved ', tx);
			} else {
				const { isApproved: lala, transaction: lili } = await approveSpending({
					contractAddress: params.deposit,
					spender: mStableDepositContract,
					gasPrice: 100 * 1000000000,
					privateKey,
					userAddress: address
				});

				if (lili) {
					console.log(lili.hash);
					await lili.wait(3);
				}

				console.log('manual approval', lala);
				console.log('manual approval transaction', lili?.hash);
			}
		}
	}, [gaslessEnabled, biconomy, address, privateKey]);

	const quote = useCallback(async () => {
		const hash = await gaslessMStableDeposit({
			address,
			token: params.deposit,
			amount: params.amount,
			minAmount: params.minAmount,
			biconomy,
			gasPrice: '100',
			privateKey
		});
		console.log('finished', hash);
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
