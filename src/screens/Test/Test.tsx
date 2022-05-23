import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { BasicLayout } from '@layouts';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useBiconomy } from '@hooks';
import WithdrawService from '@src/services/withdraw/WithdrawService';

const Test = () => {
	const { gaslessEnabled: gasless, biconomy } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const test = async () => {
		const dai = '0x707AD4021FAd2D9267F918DB937319a8710b10D8';

		const { isApproved } = await new WithdrawService('mstable').approveState(address, true, dai);

		console.log({ isApproved });

		if (!isApproved) {
			await new WithdrawService('mstable').approve({
				gasless,
				biconomy,
				address,
				privateKey,
				contract: dai
			});
		}
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test" onPress={test} marginBottom={48} />
				{gasless && <Text>Gasless</Text>}
			</View>
		</BasicLayout>
	);
};

export default Test;
