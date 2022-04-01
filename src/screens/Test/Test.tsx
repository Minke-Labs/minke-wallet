import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { Biconomy } from '@biconomy/mexa';
import { ethers } from 'ethers';
import { globalWalletState } from '@stores/WalletStore';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { gaslessApproval, gaslessDeposit } from '@models/gaslessTransaction';

const Test = () => {
	const test = async () => {
		const { privateKey, address } = globalWalletState().value;
		const url = 'https://polygon-mainnet.g.alchemy.com/v2/oCWOrhTijsp7Ir1Qm9If2xxWgNa_YIcV';
		const alchemy = new ethers.providers.JsonRpcProvider(url);
		const biconomy = new Biconomy(alchemy, {
			apiKey: 'fny6DM1HC.2dd130ac-5d62-4907-af68-17568cb95634',
			debug: true
		});

		const token = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // USDC
		const interestBearingToken = '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F'; // amUSDC
		const decimals = 6;
		const amount = formatUnits(toBn('0.01', decimals), 'wei');
		const minAmount = formatUnits(toBn('0.001', decimals), 'wei');
		const depositContract = '0x21cd021e578532e2d55bcb1105d1766be1f1736a';
		const gasPrice = '40';
		biconomy.onEvent(biconomy.READY, async () => {
			const hash = await gaslessApproval({
				address,
				privateKey,
				amount,
				contract: token,
				spender: depositContract,
				biconomy
			});
			console.log('finished approval', hash);

			const depositHash = await gaslessDeposit({
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

			console.log('finished deposit', depositHash);
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
