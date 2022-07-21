import React from 'react';
import * as qs from 'qs';
import WebView from 'react-native-webview';
import { useColorScheme, View } from 'react-native';
import { ON_RAMPER_API_KEY } from '@env';
import { Button, FullModal } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const [visible, setVisible] = React.useState(false);
	const apiKey = ON_RAMPER_API_KEY || process.env.ON_RAMPER_API_KEY;
	const scheme = useColorScheme();

	const params = {
		apiKey,
		supportSell: false,
		defaultCrypto: 'ETH',
		defaultFiat: 'USD',
		defaultAmount: 100,
		wallets: 'ETH:0xad0637645341a160c4621a5ae22a709feca37234', // wallet in downcase
		onlyCryptos: 'ETH, MATIC, USDC, USDC_POLYGON', // split by network
		isAddressEditable: false,
		isAmountEditable: false,
		color: '0A2138',
		fontFamily: 'Inter',
		darkMode: scheme === 'dark'
	};
	const url = `https://widget.onramper.com?${qs.stringify(params)}`;
	console.log(url);

	return (
		<>
			<BasicLayout>
				<View style={{ marginTop: 40 }}>
					<Button title={visible.toString()} onPress={() => setVisible(true)} />
				</View>
			</BasicLayout>
			<FullModal visible={visible} onClose={() => setVisible(false)}>
				{visible && <WebView enableApplePay useWebKit source={{ uri: url }} sharedCookiesEnabled />}
			</FullModal>
		</>
	);
};

export default Test;
