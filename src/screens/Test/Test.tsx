import React, { useState } from 'react';
import { View } from 'react-native';
import { OnrampButton, FullModal } from '@components';
import { BasicLayout } from '@layouts';
import { WebView } from 'react-native-webview';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const handleGo = () => setVisible(true);

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<OnrampButton onPress={handleGo} />
				<FullModal
					visible={visible}
					onClose={() => setVisible(false)}
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
