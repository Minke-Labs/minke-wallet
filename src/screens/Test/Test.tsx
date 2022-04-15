import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
// import { WebView } from 'react-native-webview';
import { OnrampButton, Text } from '@components';
import { BasicLayout } from '@layouts';
import OnrampModal from './OnrampModal/OnrampModal';

const Test = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<OnrampButton onPress={() => setModalVisible(true)} />
			</View>

			<OnrampModal
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<Pressable onPress={() => setModalVisible(!modalVisible)}>
					<Text>Hide Modal</Text>
				</Pressable>
				{/* <WebView
					source={{ uri: 'https://www.google.com' }}
				/> */}
			</OnrampModal>

		</BasicLayout>
	);
};

export default Test;
