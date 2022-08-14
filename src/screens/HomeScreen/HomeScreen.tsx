import React from 'react';
import { ScrollView } from 'react-native';
import { BasicLayout } from '@layouts';
import { View } from '@components';
import { Selector } from './Selector/Selector';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';

const HomeScreen = () => (
	<BasicLayout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View ph={3} mt={3}>
				<Assets />
				<Accounts />
				<Stories />
			</View>
		</ScrollView>
		<Selector />
	</BasicLayout>
);

export default HomeScreen;
