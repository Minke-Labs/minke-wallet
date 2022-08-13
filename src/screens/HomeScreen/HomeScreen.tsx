import React from 'react';
import { BasicLayout } from '@layouts';
import { Paper2, Text } from '@components';

const HomeScreen = () => (
	<BasicLayout>
		<Paper2 w={80} h={80} br={2} p={3} mb={4}>
			<Text>TESTING</Text>
		</Paper2>
		<Paper2 w={80} h={80} br={2} p={3} mb={4}>
			<Text>TESTING</Text>
		</Paper2>
		<Paper2 w={80} h={80} br={2} p={3}>
			<Text>TESTING</Text>
		</Paper2>
	</BasicLayout>
);

export default HomeScreen;
