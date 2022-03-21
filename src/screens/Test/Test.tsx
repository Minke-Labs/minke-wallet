import React from 'react';
import { View } from 'react-native';
import { Token } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => (
	<BasicLayout>
		<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
			<Token name="busd" />
		</View>
	</BasicLayout>
);

export default Test;
