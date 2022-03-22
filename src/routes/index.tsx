import React from 'react';
import { useState } from '@hookstate/core';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	AccountsScreen,
	AssetsScreen,
	BackupScreen,
	BackupSettingsScreen,
	ChangeNetworkScreen,
	ExchangeResumeScreen,
	ExchangeScreen,
	SettingsScreen,
	TransactionsScreen,
	WalletAssetsScreen,
	WalletCreatedScreen,
	WalletScreen,
	WelcomeScreen,
	SaveScreen,
	DepositScreen,
	USDCoinScreen,
	DepositSuccessScreen,
	TopUpWaitScreen,
	Test
} from '@screens';
import { Icon } from '@components';
import { RootStackParamList } from './types.routes';
import { globalWalletState } from '../stores/WalletStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
	const scheme = useColorScheme();
	const walletState = useState(globalWalletState());
	const initialScreen = walletState.value.walletId ? 'WalletScreen' : 'WelcomeScreen';

	const defaultOptions = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => ({
		title: '',
		headerStyle: {
			backgroundColor: scheme === 'dark' ? '#0A2138' : '#F2EAE1'
		},
		headerShadowVisible: false,
		headerLeft: () => (
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
			</TouchableOpacity>
		)
	});

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="AccountsScreen" component={AccountsScreen} />
				<Stack.Screen name="AssetsScreen" component={AssetsScreen} />
				<Stack.Screen name="BackupScreen" component={BackupScreen} />
				<Stack.Screen name="BackupSettingsScreen" component={BackupSettingsScreen} />
				<Stack.Screen name="ChangeNetworkScreen" component={ChangeNetworkScreen} />
				<Stack.Screen name="DepositScreen" component={DepositScreen} />
				<Stack.Screen
					name="ExchangeResumeScreen"
					component={ExchangeResumeScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen
					name="ExchangeScreen"
					component={ExchangeScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen name="SaveScreen" component={SaveScreen} />
				<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
				<Stack.Screen
					name="TransactionsScreen"
					component={TransactionsScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen name="USDCoinScreen" component={USDCoinScreen} />
				<Stack.Screen name="WalletAssetsScreen" component={WalletAssetsScreen} />
				<Stack.Screen name="WalletCreatedScreen" component={WalletCreatedScreen} />
				<Stack.Screen name="WalletScreen" component={WalletScreen} />
				<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

				<Stack.Screen name="Test" component={Test} />
				<Stack.Screen name="DepositSuccessScreen" component={DepositSuccessScreen} />
				<Stack.Screen name="TopUpWaitScreen" component={TopUpWaitScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
