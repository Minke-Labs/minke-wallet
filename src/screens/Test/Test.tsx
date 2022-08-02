import React from 'react';
import { Button, Text } from '@components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { BasicLayout } from '@layouts';
import { View } from 'react-native';
import { sendTransactionData } from '@models/wallet';
import Logger from '@utils/logger';

const ConnectButton = () => {
	const connector = useWalletConnect();
	if (!connector.connected) {
		return <Button title="Connect" onPress={() => connector.connect()} />;
	}
	return <Button title="Kill Session" onPress={() => connector.killSession()} />;
};

const Test = () => {
	const connector = useWalletConnect();
	const { connected, accounts, chainId } = connector;

	const sendTransaction = async () => {
		const to = '0x5F5e3148532d1682866131A1971Bb74a92D96376';
		const amount = '0.01';
		const tx = await sendTransactionData(accounts[0], to, amount, '100', 'matic', '', 18);
		// Send transaction
		try {
			const { from, value, data, gasPrice } = tx;
			const result = await connector.sendTransaction({
				from,
				to,
				value: value?.toHexString(),
				data,
				gasPrice: gasPrice.toHexString()
			});
			Logger.log({ result });
		} catch (error) {
			// Error returned when rejected
			console.error({ error });
		}
	};

	return (
		<BasicLayout>
			<View style={{ marginTop: 24 }}>
				{connected ? (
					<>
						<Text> {accounts[0]}</Text>
						<Text> chainId: {chainId}</Text>
						<Button title="Send transaction" onPress={sendTransaction} marginBottom={48} />
					</>
				) : (
					<Button title="TRY!" onPress={() => null} marginBottom={48} />
				)}
				<ConnectButton />
			</View>
		</BasicLayout>
	);
};

export default Test;
