import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { Wallet } from 'ethers';
import { getProvider } from '@models/wallet';
import { claimRewards } from '@src/services/apis/minke/minke';

const Test = () => {
	const { address, privateKey } = useState(globalWalletState()).value;
	const test = async () => {
		const wallet = new Wallet(privateKey, await getProvider());
		const points = 100;
		const timestamp = Math.floor(Date.now() / 1000 + 60);
		const params = {
			timestamp,
			points
		};
		const message = JSON.stringify(params);
		const signature = await wallet.signMessage(message);

		const request = {
			address,
			points,
			timestamp,
			signature
		};

		const rewards = await claimRewards(request);
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
