import React from 'react';
import { View } from 'react-native';
import { BasicLayout } from '@layouts';
import { GenericPayButton } from '@components';

const Test = () => (
	<BasicLayout>
		<View style={{ marginTop: 40, paddingHorizontal: 16 }}>
			<GenericPayButton />
		</View>
	</BasicLayout>
);

export default Test;
