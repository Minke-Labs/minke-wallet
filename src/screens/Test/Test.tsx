import React from 'react';
import { View, Button } from 'react-native';
import { BasicLayout } from '@layouts';

const Test = () => {
	const test = () => {};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test" onPress={test} />
			</View>
		</BasicLayout>
	);
};

export default Test;
