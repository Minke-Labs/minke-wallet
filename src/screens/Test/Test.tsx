import React from 'react';
import * as Amplitude from 'expo-analytics-amplitude';
import { View } from 'react-native';
import { useAmplitude } from '@hooks';
import { Button } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const { track2 } = useAmplitude();

	const clickEvent = () => {
		Amplitude.clearUserPropertiesAsync();
		track2('CLICKED TEST EVENT AGAIN!', '0x375CC1b3574F3e5f0418D006bbADbcE5CFe13564');
	};

	return (
		<BasicLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				{/* <Token name="busd" /> */}
				<Button title="Amplitude Test" onPress={clickEvent} />
			</View>
		</BasicLayout>
	);
};

export default Test;
