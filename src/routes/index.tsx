import React from 'react';
import { useState } from '@hookstate/core';
import RNUxcam from 'react-native-ux-cam';
import { TransactionsProvider } from '@contexts';
import { useWalletState } from '@hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screensObj from '@screens';
import { RootStackParamList } from './types.routes';
import { globalWalletState } from '../stores/WalletStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

RNUxcam.setAutomaticScreenNameTagging(false);

const screenNamesArr = Object.keys(screensObj);

const Routes: React.FC = () => {
	const { accountName } = useWalletState();
	RNUxcam.setUserIdentity(accountName);

	const walletState = useState(globalWalletState());
	const initialScreen = walletState.value.walletId ? 'WalletScreen' : 'WelcomeScreen';

	return (
		<NavigationContainer>
			<TransactionsProvider>
				<Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
					{
						screenNamesArr.map((key: string) => (
							<Stack.Screen
								key={key}
								name={key as keyof RootStackParamList}
								component={screensObj[key as keyof typeof screensObj]}
							/>
						))
					}
				</Stack.Navigator>
			</TransactionsProvider>
		</NavigationContainer>
	);
};

export default Routes;
