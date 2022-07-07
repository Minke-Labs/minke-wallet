import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { getRewards } from '@src/services/apis/minke/minke';

const Test = () => {
	const { address } = useState(globalWalletState()).value;
	const test = async () => {
		const rewards = await getRewards(address);
		console.log(rewards);
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
