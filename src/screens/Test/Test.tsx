import React from 'react';
import { Button, Text } from '@components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { BasicLayout } from '@layouts';
import { View } from 'react-native';

const ConnectButton = () => {
	const connector = useWalletConnect();
	if (!connector.connected) {
		/**
		 *  Connect! 🎉
		 */
		return <Button title="Connect" onPress={() => connector.connect()} />;
	}
	return <Button title="Kill Session" onPress={() => connector.killSession()} />;
};

const Test = () => {
	const { connected, accounts, chainId } = useWalletConnect();
	return (
		<BasicLayout>
			<View style={{ marginTop: 24 }}>
				{!!connected && (
					<>
						<Text> {accounts[0]}</Text>
						<Text> chainId: {chainId}</Text>
					</>
				)}
				<ConnectButton />
			</View>
		</BasicLayout>
	);
};

export default Test;
