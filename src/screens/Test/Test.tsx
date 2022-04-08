import React from 'react';
import { View } from 'react-native';
import { HapticButton } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const test = () => console.log('PRESSED!!!!!');

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<HapticButton title="Test" onPress={test} marginBottom={48} />
			</View>
		</BasicLayout>
	);
};

export default Test;
