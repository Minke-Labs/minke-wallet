import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { getUniqueId } from 'react-native-device-info';

const Test = () => {
	const test = () => {
		console.log(getUniqueId());
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test" onPress={test} marginBottom={48} />
			</View>
		</BasicLayout>
	);
};

export default Test;
