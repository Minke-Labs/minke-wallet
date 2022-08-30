import React, { useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { View, FloatingSelector } from '@components';
import { useAmplitude, useWalletState } from '@hooks';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';

const HomeScreen = () => {
	RNUxcam.tagScreenName('HomeScreen');

	const { track } = useAmplitude();

	const { state } = useWalletState();
	const { address, balance } = state.value;

	useEffect(() => {
		track('Home Screen Opened');
		track('Wallet access', { active: (balance?.usd || 0) > 0, address });
	}, []);

	return (
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
			<FloatingSelector />
		</BasicLayout>
	);
};

export default HomeScreen;
