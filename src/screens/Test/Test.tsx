/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
import React, { useState } from 'react';
import { View } from 'react-native';
import { OnrampButton, FullModal } from '@components';
import { makeOrder } from '@models/banxa';
import { BasicLayout } from '@layouts';
import { WebView } from 'react-native-webview';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const [orderLink, setOrderLink] = useState('');
	const handleGo = async () => {
		// const params = {
		// 	source: 'CAD',
		// 	target: 'USDC',
		// 	amount: 100
		// };

		const params = {
			account_reference: 'xxxxxxxxxx',
			source: 'CAD',
			target: 'USDC',
			source_amount: '100',
			return_url_on_success: '#',
			wallet_address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
		};

		const url = await makeOrder({ params });
		setOrderLink(url);
		setVisible(true);
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<OnrampButton onPress={handleGo} />
				<FullModal
					onClose={() => setVisible(false)}
					visible={visible}
				>
					<WebView
						source={{ uri: orderLink }}
						sharedCookiesEnabled
					/>
				</FullModal>
			</View>
		</BasicLayout>
	);
};

export default Test;
