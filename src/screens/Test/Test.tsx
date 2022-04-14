import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { BasicLayout } from '@layouts';
import * as qs from 'qs';
import { gaslessApproval, gaslessExchange } from '@models/gaslessTransaction';
import { useBiconomy } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { toBn } from 'evm-bn';
import { formatUnits } from 'ethers/lib/utils';
import { approvalState } from '@models/deposit';

const Test = () => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;
	const depositContract = '0x0d03D7b41D967DBea44ff0dab932d45E41d2dda3'; // change;

	const params = {
		// sell: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
		sell: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', // WBTC
		buy: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
		amount: formatUnits(toBn('0.00000054', 8), 'wei'),
		minAmount: formatUnits(toBn('0.001', 6), 'wei')
	};

	const approve = useCallback(async () => {
		const { isApproved } = await approvalState(address, params.sell, depositContract);
		if (!isApproved) {
			const approvalParams = {
				sellTokenAddress: params.sell,
				buyTokenAddress: params.buy,
				ownerAddress: address,
				network: 'polygon',
				api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241'
			};
			// const approvalURL = `https://api.zapper.fi/v1/exchange/price?${qs.stringify(approvalParams)}`;
			// const approvalTransaction = await fetch(approvalURL);
			// const { allowanceTarget } = await approvalTransaction.json();
			if (gaslessEnabled) {
				const tx = await gaslessApproval({
					address: approvalParams.ownerAddress,
					biconomy,
					contract: approvalParams.sellTokenAddress,
					privateKey,
					spender: depositContract
				});

				await biconomy.getEthersProvider().waitForTransaction(tx, 3);

				console.log('Approved ', tx);
			}
		}
	}, [gaslessEnabled, biconomy, address, privateKey]);

	const quote = useCallback(async () => {
		const quoteParams = {
			sellToken: params.sell.toLowerCase(),
			buyToken: params.buy.toLowerCase(),
			sellAmount: params.amount,
			takerAddress: address.toLowerCase(),
			skipValidation: true
		};
		const url = `https://polygon.api.0x.org/swap/v1/quote?${qs.stringify(quoteParams)}`;
		console.log({ quoteParams });
		const quoteTransaction = await (await fetch(url)).json();
		console.log({ quoteTransaction });
		const { sellTokenAddress, sellAmount, buyTokenAddress, to, value, data } = quoteTransaction;

		if (value === '0' && gaslessEnabled) {
			const hash = await gaslessExchange({
				address,
				amount: sellAmount,
				minAmount: params.minAmount,
				biconomy,
				depositContract,
				gasPrice: '50',
				privateKey,
				swapData: data,
				token: sellTokenAddress,
				toToken: buyTokenAddress,
				swapTarget: to
			});
			console.log('finished', hash);
		} else {
			console.log('Need to manually do the transaction with gas');
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
