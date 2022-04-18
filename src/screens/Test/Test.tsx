import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { OnrampButton, Text } from '@components';
import { BasicLayout } from '@layouts';
import { WebView } from 'react-native-webview';
import OnrampModal from './OnrampModal/OnrampModal';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const handleGo = () => setVisible(true);

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<OnrampButton onPress={handleGo} />

				<OnrampModal
					visible={visible}
					onRequestClose={() => setVisible(false)}
				>
					<Pressable onPress={() => setVisible(false)}>
						<Text>Close</Text>
					</Pressable>
					<View style={{
						height: '100%',
						width: '100%'
					}}
					>
						<WebView
							source={{ uri: 'https://www.minke.app' }}
						/>
					</View>
				</OnrampModal>
			</View>
		</BasicLayout>
	);
};

export default Test;
