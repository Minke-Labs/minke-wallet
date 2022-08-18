import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { View } from '@components';
import { Selector } from './Selector/Selector';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';

const HomeScreen = () => (
	<BasicLayout>
		<SafeAreaView />
		<ScrollView showsVerticalScrollIndicator={false}>
			<View ph={3}>
				<Header />
				<Assets />
				<Accounts />
				<Stories />
			</View>
		</ScrollView>
		<Selector />
	</BasicLayout>
);

export default HomeScreen;
