import React from 'react';
import * as Sentry from 'sentry-expo';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const clickEvent = () => {
		console.log('CLICKED!');
		Sentry.Native.captureMessage('CLICKED!');
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Sentry Test" onPress={clickEvent} />
			</View>
		</BasicLayout>
	);
};

export default Test;
