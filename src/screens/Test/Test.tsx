import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { getOrder } from '@models/banxa';

const Test = () => {
	const test = async () => {
		await getOrder('4831273cf0c7fa8c1d1a9fb98c19a98a');
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
