import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Chart from './Chart/Chart';

const Test = () => (
	<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
		<ScrollView>
			<Chart />
		</ScrollView>
	</SafeAreaView>
);

export default Test;
