import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { BasicLayout } from '@layouts';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useBiconomy } from '@hooks';
import WithdrawService from '@src/services/withdraw/WithdrawService';
import { getOrder } from '@models/banxa';

const Test = () => {
	const { gaslessEnabled: gasless, biconomy } = useBiconomy();
	const { address, privateKey } = useState(globalWalletState()).value;

	const test = async () => {
		const lala = await getOrder('4831273cf0c7fa8c1d1a9fb98c19a98a');
		console.log(lala);
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test" onPress={test} marginBottom={48} />
			</View>
		</BasicLayout>
	);
};

export default Test;
