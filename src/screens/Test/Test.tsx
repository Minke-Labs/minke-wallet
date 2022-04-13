/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View } from 'react-native';
import { OnrampButton } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const test = () => null;

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<OnrampButton />
			</View>
		</BasicLayout>
	);
};

export default Test;
