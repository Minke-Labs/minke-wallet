import React from 'react';
import { View } from 'react-native';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import Logger from '@utils/logger';
import { captureException } from '@sentry/react-native';
import { useNavigation } from '@hooks';

const Test = () => {
	const navigation = useNavigation();
	const clickLog = () => {
		Logger.log('Marcos and Romullo clickLog');
	};
	const clickError = () => {
		Logger.error('Marcos and Romullo clickError');
	};
	const clickCapturedException = () => {
		try {
			throw new Error('Marcos and Romullo clickCapturedException');
		} catch (error) {
			captureException(error);
		}
	};
	const clickException = () => {
		throw new Error('Marcos and Romullo clickException');
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Test log" onPress={clickLog} marginBottom={8} />
				<Button title="Test error" onPress={clickError} marginBottom={8} />
				<Button title="Test captured exception" onPress={clickCapturedException} marginBottom={8} />
				<Button title="Test exception" onPress={clickException} marginBottom={8} />
				<Button title="Back" onPress={() => navigation.goBack()} marginBottom={8} />
			</View>
		</BasicLayout>
	);
};

export default Test;
