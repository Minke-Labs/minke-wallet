import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { globalWalletState } from '@stores/WalletStore';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { gaslessApproval, gaslessDeposit } from '@models/gaslessTransaction';
import useBiconomy from '@src/hooks/useBiconomy';

const Test = () => {
	const biconomy = useBiconomy();
	const { privateKey, address } = globalWalletState().value;

	const test = async () => {
		if (biconomy.status !== biconomy.READY) return;
		const token = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // USDC
		const interestBearingToken = '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F'; // amUSDC
		const decimals = 6;
		const amount = formatUnits(toBn('0.01', decimals), 'wei');
		const minAmount = formatUnits(toBn('0.001', decimals), 'wei');
		const depositContract = '0x467ebee3755455a5f2be81ca50b738d7a375f56a';
		const gasPrice = '40';
		await gaslessApproval({
			address,
			privateKey,
			contract: token,
			spender: depositContract,
			biconomy
		});

		await gaslessDeposit({
			address,
			amount,
			biconomy,
			depositContract,
			gasPrice,
			interestBearingToken,
			minAmount,
			privateKey,
			token
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
