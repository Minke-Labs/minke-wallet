import React from 'react';
import { View } from 'react-native';
import { BasicLayout } from '@layouts';
import { GenericButton } from '@components';

const Test = () => (
	<BasicLayout>
		<View style={{ marginTop: 40, paddingHorizontal: 16 }}>
			<GenericButton />
		</View>
	</BasicLayout>
);

export default Test;
