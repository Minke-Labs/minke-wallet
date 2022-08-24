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
			<View ph="xs">
				<Header />
				<Assets />
				<Accounts />
				<Stories />
				<View mb="xxxl" />
				<View mb="m" />
			</View>
		</ScrollView>
		<Selector />
	</BasicLayout>
);

export default HomeScreen;