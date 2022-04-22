import React from 'react';
import { View, Button } from 'react-native';
import { BasicLayout } from '@layouts';
import { useBiconomy } from '@hooks';
import { globalWalletState } from '@stores/WalletStore';

const Test = () => {
	const { gaslessEnabled, canSubmitGaslessTransaction } = useBiconomy();
	const { address } = globalWalletState();
	const test = async () => {
		const allowed = await canSubmitGaslessTransaction(address);
		console.log({ allowed });
	};

	console.log({ gaslessEnabled });

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test" onPress={test} />
			</View>
		</BasicLayout>
	);
};

export default Test;
