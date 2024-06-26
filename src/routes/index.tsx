import React, { useEffect } from 'react';
import RNUxcam from 'react-native-ux-cam';
import crypto from 'crypto';
import { INTERCOM_KEY } from '@env';
import Intercom from '@intercom/intercom-react-native';
import { TransactionsProvider } from '@contexts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import screensObj from '@screens';
import Logger from '@utils/logger';
import { useGlobalWalletState } from '@hooks';
import { RootStackParamList } from './types.routes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

RNUxcam.setAutomaticScreenNameTagging(false);

const screenNamesArr = Object.keys(screensObj);

const Routes: React.FC = () => {
	const state = useGlobalWalletState();
	const { address } = state;
	RNUxcam.setUserIdentity(address);

	// const initialScreen = walletId ? 'HomeScreen' : 'WelcomeScreen';
	const initialScreen = 'WelcomeScreen';

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

	useEffect(() => {
		const intercomKey = INTERCOM_KEY || process.env.INTERCOM_KEY;
		const hmac = crypto.createHmac('sha256', intercomKey!);
		hmac.update(address);
		const sign = hmac.digest('hex');
		Intercom.setUserHash(sign);
		Intercom.registerIdentifiedUser({ userId: address });
	}, [address]);

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
