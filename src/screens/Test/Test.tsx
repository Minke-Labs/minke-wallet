import React from 'react';
import * as qs from 'qs';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { MOONPAY_API_URL, MOONPAY_API_KEY, MOONPAY_SECRET_KEY } from '@env';
import { Button, FullModal } from '@components';
import { BasicLayout } from '@layouts';
import { useState } from '@hookstate/core';
import crypto from 'crypto';
import { globalWalletState } from '@stores/WalletStore';

const Test = () => {
	const [visible, setVisible] = React.useState(false);
	const apiKey = MOONPAY_API_KEY || process.env.MOONPAY_API_KEY;
	const { address } = useState(globalWalletState()).value;

	const params = {
		apiKey,
		currencyCode: 'ETH',
		walletAddress: address,
		baseCurrencyCode: 'usd',
		baseCurrencyAmount: 159,
		lockAmount: true
	};

	const query = `?${qs.stringify(params)}`;
	const host = MOONPAY_API_URL || process.env.MOONPAY_API_URL;
	const originalUrl = `${host}${query}`;
	const secret = MOONPAY_SECRET_KEY || process.env.MOONPAY_SECRET_KEY;
	const signature = crypto.createHmac('sha256', secret!).update(query).digest('base64');
	const urlWithSignature = `${originalUrl}&signature=${encodeURIComponent(signature)}`;

	return (
		<>
			<BasicLayout>
				<View style={{ marginTop: 40 }}>
					<Button title={visible.toString()} onPress={() => setVisible(true)} />
				</View>
			</BasicLayout>
			<FullModal visible={visible} onClose={() => setVisible(false)}>
				{visible && (
					<WebView enableApplePay useWebKit source={{ uri: urlWithSignature }} sharedCookiesEnabled />
				)}
			</FullModal>
		</>
	);
};

export default Test;
