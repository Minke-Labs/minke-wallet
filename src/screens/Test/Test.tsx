import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Chart from './Chart/Chart';

const Test = () => (
	<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
		<SafeAreaView>
			<Chart />
			<View
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: '#F2EAE1',
					borderTopLeftRadius: 24,
					borderTopRightRadius: 24
				}}
			/>
		</SafeAreaView>
	</ScrollView>
);

export default Test;
