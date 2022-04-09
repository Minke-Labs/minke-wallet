import React, { useState } from 'react';
import { View } from 'react-native';
import { BasicLayout } from '@layouts';
import { NetworkWarning } from '@components';

const Test = () => {
	const [isModalVisible, setModalVisible] = useState(false);

	return (
		<>
			<BasicLayout>
				<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
					<NetworkWarning.Tag onPress={() => setModalVisible(true)} />
				</View>
			</BasicLayout>
			<NetworkWarning.Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)} />
		</>
	);
};

export default Test;
