import { Wallet } from 'ethers';
import React, { useEffect } from 'react';
import SafariView from 'react-native-safari-view';

import { Button, Text, View } from '@components';
import { WALLET_CONNECT_PROJECT_ID } from '@env';
import { useGlobalWalletState, useNavigation } from '@hooks';
import { BasicLayout } from '@layouts';
import { hexToUtf8 } from '@utils/signing/signing';
import { Core } from '@walletconnect/core';
import { buildApprovedNamespaces } from '@walletconnect/utils';
import { Web3Wallet } from '@walletconnect/web3wallet';

const Test = () => {
	const { address, network, privateKey } = useGlobalWalletState();
	const navigation = useNavigation();
	const core = new Core({
		projectId: WALLET_CONNECT_PROJECT_ID || process.env.PROJECT_ID,
		relayUrl: 'wss://relay.walletconnect.org'
	});

	useEffect(() => {
		const initializeWalletConnect = async () => {
			console.log('INitialize...');
			const web3wallet = await Web3Wallet.init({
				core, // <- pass the shared `core` instance
				metadata: {
					name: 'Demo app',
					description: 'Demo Client as Wallet/Peer',
					url: 'www.walletconnect.com',
					icons: []
				}
			});

			web3wallet.on('session_proposal', async (sessionProposal) => {
				console.log({ sessionProposal });
				const { id, params } = sessionProposal;

				// ------- namespaces builder util ------------ //
				const approvedNamespaces = buildApprovedNamespaces({
					proposal: params,
					supportedNamespaces: {
						eip155: {
							chains: ['eip155:1', 'eip155:137'],
							methods: ['eth_sendTransaction', 'personal_sign'],
							events: ['accountsChanged', 'chainChanged'],
							accounts: [`eip155:137:${address}`]
						}
					}
				});
				// ------- end namespaces builder util ------------ //

				await web3wallet.approveSession({
					id,
					namespaces: approvedNamespaces
				});
			});

			web3wallet.on('session_request', async (event) => {
				console.log({ sessionRequest: event });
				const { topic, params, id } = event;
				const { request } = params;
				const requestParamsMessage = request.params[0];

				// convert `requestParamsMessage` by using a method like hexToUtf8
				const message = hexToUtf8(requestParamsMessage);
				const wallet = new Wallet(privateKey!);
				// sign the message
				const signedMessage = await wallet.signMessage(message);

				const response = { id, result: signedMessage, jsonrpc: '2.0' };

				await web3wallet.respondSessionRequest({ topic, response });
			});
		};
		initializeWalletConnect();
	}, []);

	const test = async () => {
		const url = 'https://app.openpeer.xyz';
		try {
			SafariView.show({
				url
			});
		} catch {
			navigation.navigate('WebViewScreen', { uri: url, title: 'OpenPeer' });
		}
	};

	return (
		<BasicLayout>
			<View p="s">
				<Button title="OpenPeer" onPress={test} mb="s" />
				<Text>{address}</Text>
				<Text>{network.name}</Text>
			</View>
		</BasicLayout>
	);
};

export default Test;
