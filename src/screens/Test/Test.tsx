import React from 'react';
import * as Amplitude from 'expo-analytics-amplitude';
import { View } from 'react-native';
import { useAmplitude } from '@hooks';
import { Button } from '@components';
import { BasicLayout } from '@layouts';
import { AMPLITUDE_PROJECT_API } from '@env';

const Test = () => {
	const { track } = useAmplitude();

	const clickEvent = () => {
		Amplitude.clearUserPropertiesAsync();
		console.log(AMPLITUDE_PROJECT_API);
		track('testEvent', '0x165cd37b4c644c2921454429e7f9358d18a45e14');
		console.log('Enviou');
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Button title="Amplitude Test" onPress={clickEvent} />
			</View>
		</BasicLayout>
	);
};

export default Test;
