import React from 'react';
import { View } from 'react-native';
import { useAmplitude } from '@hooks';
import { Button } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const { track } = useAmplitude();

	const clickEvent = () => {
		console.log('clicou!');
		track('CLICASTE MAIS UMA VEZ!');
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
