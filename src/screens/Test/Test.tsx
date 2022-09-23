import React from 'react';
import { Text, View } from '@components';
import WalletConnect from '@walletconnect/client';
import { useGlobalWalletState } from '@hooks';
import { parseWalletConnectUri } from '@walletconnect/utils';
import { BasicLayout } from '@layouts';

const Test = () => {
	const {
		address,
		network: { chainId }
	} = useGlobalWalletState();
	const uri =
		'wc:6a792cff-6f5c-451b-9cbc-6726b31ce3e7@1?bridge=https%3A%2F%2Fz.bridge.walletconnect.org&key=84e20c1f703dd13823834d48ec554948c3bbefb67b94ccb7a01af49ad3ae04bf';

	console.log(parseWalletConnectUri(uri));
	const connector = new WalletConnect({
		// Required
		uri,
		// Required
		clientMeta: {
			description: 'WalletConnect Developer App',
			url: 'https://walletconnect.org',
			icons: ['https://walletconnect.org/walletconnect-logo.png'],
			name: 'WalletConnect'
		}
	});
	// Check if connection is already established
	if (!connector.connected) {
		// create new session
		console.log('connecting');
		connector.createSession();
	} else {
		console.log('connected!!');
	}

	connector.on('session_request', (error, payload) => {
		console.log('session_request', payload);
		if (error) {
			throw error;
		}

		// Handle Session Request

		/* payload:
		{
			id: 1,
			jsonrpc: '2.0'.
			method: 'session_request',
			params: [{
				peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
				peerMeta: {
					name: "WalletConnect Example",
					description: "Try out WalletConnect v1.0",
					icons: ["https://example.walletconnect.org/favicon.ico"],
					url: "https://example.walletconnect.org"
				}
			}]
		}
		*/
		console.log('approving');
		connector.approveSession({
			accounts: [address],
			chainId
		});
		const { peerId, session } = connector;
		console.log('connected to', { peerId, session });
	});

	// Subscribe to call requests
	connector.on('call_request', (error, payload) => {
		console.log('call_request', payload);
		if (error) {
			throw error;
		}

		const { clientId, peerId, peerMeta } = connector;
		console.log({ clientId, peerId, peerMeta });

		// Handle Call Request

		/* payload:
		{
			id: 1,
			jsonrpc: '2.0'.
			method: 'eth_sign',
			params: [
				"0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
				"My email is john@doe.com - 1537836206101"
			]
		}
		*/
	});

	connector.on('disconnect', (error, payload) => {
		console.log('disconnect', payload);
		if (error) {
			throw error;
		}

		connector.killSession();
	});

	return (
		<BasicLayout>
			<View flex1 bw={2}>
				<Text>Marcos {connector.connected.toString()}</Text>
				<Text>Marcos {connector.chainId}</Text>
				<Text>Marcos {connector.accounts[0]}</Text>
			</View>
		</BasicLayout>
	);
};

export default Test;
