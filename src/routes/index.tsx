import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import RNUxcam from 'react-native-ux-cam';
import { TransactionsProvider } from '@contexts';
import { useWalletState } from '@hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import screensObj from '@screens';
import Logger from '@utils/logger';
import { RootStackParamList } from './types.routes';
import { globalWalletState } from '../stores/WalletStore';

const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

RNUxcam.setAutomaticScreenNameTagging(false);

const screenNamesArr = Object.keys(screensObj);

const Routes: React.FC = () => {
	const { accountName } = useWalletState();
	RNUxcam.setUserIdentity(accountName);

	const walletState = useState(globalWalletState());
	// const initialScreen = walletState.value.walletId ? 'WalletScreen' : 'WelcomeScreen';
	const initialScreen = walletState.value.walletId ? 'HomeScreen' : 'WelcomeScreen';

	const urlRedirect = (event: any) => {
		const { url } = event;
		if (!url) return;
		const parsed = Linking.parse(url);
		const { path, queryParams } = parsed;
		Logger.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
	};

	useEffect(() => {
		Linking.getInitialURL().then((url) => url && urlRedirect({ url }));

		Linking.addEventListener('url', urlRedirect);

		return () => Linking.removeEventListener('url', urlRedirect);
	}, []);

	const linking = {
		prefixes: [prefix],
		config: {
			screens: {
				Test: 'test',
				MoonpayWaitScreen: 'moonpayWaitScreen'
			}
		}
	};

	return (
		<NavigationContainer linking={linking}>
			<TransactionsProvider>
				<Stack.Navigator
					initialRouteName={initialScreen}
					screenOptions={{ headerShown: false, animation: 'none' }}
				>
					{screenNamesArr.map((key: string) => (
						<Stack.Screen
							key={key}
							name={key as keyof RootStackParamList}
							component={screensObj[key as keyof typeof screensObj]}
						/>
					))}
				</Stack.Navigator>
			</TransactionsProvider>
		</NavigationContainer>
	);
};

export default Routes;
