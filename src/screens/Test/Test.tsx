import React, { useState } from 'react';
import { Button, ModalBase, View } from '@components';
import WalletConnect from '@walletconnect/client';
import { BasicLayout } from '@layouts';
import ConnectionRequestModal from '@src/components/WalletConnect/ConnectionRequestModal';

const Test = () => {
	const [visible, setVisible] = useState(false);

	const uri =
		'wc:0555bd36-e9e2-4545-9cea-2de600812c2c@1?bridge=https%3A%2F%2Fb.bridge.walletconnect.org&key=48aaa377e90e8ecc8967599dc886241e1f90cb413f5744fad95295fea29bdddb';

	const connect = (address: string, chainId: number) => {
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
			// check if it's already connected
			// ask the user and approve or reject the request
			connector.approveSession({
				accounts: [address],
				chainId
			});
			const { peerId, session } = connector;
			console.log('connected to', { peerId, session });
			// save session
			// start listening

			setVisible(false);
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

			// delete from the storage
		});
	};

	return (
		<>
			<BasicLayout>
				<View flex1 mt="xxl">
					<Button title="Connect" onPress={() => setVisible(true)} />
				</View>
			</BasicLayout>
			<ModalBase isVisible={visible} onDismiss={() => setVisible(false)}>
				<ConnectionRequestModal onDismiss={() => setVisible(false)} onConnect={connect} />
			</ModalBase>
		</>
	);
};

export default Test;
