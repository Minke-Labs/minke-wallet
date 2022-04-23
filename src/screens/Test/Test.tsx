import React, { useState } from 'react';
import { View } from 'react-native';
import { OnrampButton, FullModal } from '@components';
import { getPrices } from '@models/banxa';
import { BasicLayout } from '@layouts';
import { WebView } from 'react-native-webview';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const handleGo = async () => {
		const params = {
			source: 'CAD',
			target: 'USDC',
			amount: 100
		};

		const res = await getPrices({ params });
		console.log('\n\n\n\n');
		console.log('returned!!', res.prices);
		// setVisible(true);
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
						source={{ uri: 'https://www.minke.app' }}
						sharedCookiesEnabled
					/>
				</FullModal>
			</View>
		</BasicLayout>
	);
};

export default Test;
