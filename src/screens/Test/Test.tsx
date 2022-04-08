import React from 'react';
import { View } from 'react-native';
import { HapticButton } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const test = () => null;

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<HapticButton onPress={test} marginBottom={48} />
			</View>
		</BasicLayout>
	);
};

export default Test;
