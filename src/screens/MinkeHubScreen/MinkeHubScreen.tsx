import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text } from '@components';
import { BasicLayout } from '@layouts';
import { Selector } from '../HomeScreen/Selector/Selector';

const MinkeHubScreen = () => (
	<BasicLayout>
		<SafeAreaView />
		<Text>MinkeHubScreen</Text>
		<Selector onActionPressed={() => null} />
	</BasicLayout>
);

export default MinkeHubScreen;
