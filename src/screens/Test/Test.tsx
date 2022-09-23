import React, { useState } from 'react';
import { Button, ModalBase, View } from '@components';
import WalletConnect from '@walletconnect/client';
import { BasicLayout } from '@layouts';
import ConnectionRequestModal from '@src/components/WalletConnect/ConnectionRequestModal';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const [wc, setWc] = useState<WalletConnect>();

	const uri =
		'wc:5d58fd74-da0f-4d19-8305-bf0a146d8d49@1?bridge=https%3A%2F%2F6.bridge.walletconnect.org&key=9adcf1023d820972126bc485456bcde28c7c6db78c87e765718b86407df9946c';

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
		setWc(connector);
		setVisible(true);
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

	const connect = (address: string, chainId: number) => {
		wc!.approveSession({
			accounts: [address],
			chainId
		});

		setVisible(false);
	};

	const dismiss = () => {
		wc?.rejectSession();
		setVisible(false);
	};

	return (
		<>
			<BasicLayout>
				<View flex1 mt="xxl">
					<Button title="Connect" onPress={() => setVisible(true)} />
				</View>
			</BasicLayout>
			<ModalBase isVisible={visible} onDismiss={dismiss}>
				<ConnectionRequestModal onDismiss={dismiss} onConnect={connect} />
			</ModalBase>
		</>
	);
};

export default Test;
