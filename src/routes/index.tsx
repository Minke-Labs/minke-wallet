import React from 'react';
// import { useState } from '@hookstate/core';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	AccountsScreen,
	AssetsScreen,
	ManualBackupScreen,
	BackupSettingsScreen,
	BackupStatusScreen,
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
	DepositWithdrawalSuccessScreen,
	BackupToICloudScreen,
	TopUpWaitScreen,
	WithdrawScreen,
	Test
} from '@screens';
import { RootStackParamList } from './types.routes';
// import { globalWalletState } from '../stores/WalletStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
	// const walletState = useState(globalWalletState());
	// const initialScreen = walletState.value.walletId ? 'WalletScreen' : 'WelcomeScreen';
	const initialScreen = 'Test';

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="AccountsScreen" component={AccountsScreen} />
				<Stack.Screen name="AssetsScreen" component={AssetsScreen} />
				<Stack.Screen name="ManualBackupScreen" component={ManualBackupScreen} />
				<Stack.Screen name="BackupStatusScreen" component={BackupStatusScreen} />
				<Stack.Screen name="BackupSettingsScreen" component={BackupSettingsScreen} />
				<Stack.Screen name="ChangeNetworkScreen" component={ChangeNetworkScreen} />
				<Stack.Screen name="DepositScreen" component={DepositScreen} />
				<Stack.Screen name="ExchangeResumeScreen" component={ExchangeResumeScreen} />
				<Stack.Screen name="ExchangeScreen" component={ExchangeScreen} />
				<Stack.Screen name="SaveScreen" component={SaveScreen} />
				<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
				<Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
				<Stack.Screen name="USDCoinScreen" component={USDCoinScreen} />
				<Stack.Screen name="WalletAssetsScreen" component={WalletAssetsScreen} />
				<Stack.Screen name="WalletCreatedScreen" component={WalletCreatedScreen} />
				<Stack.Screen name="WalletScreen" component={WalletScreen} />
				<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
				<Stack.Screen name="Test" component={Test} />
				<Stack.Screen name="DepositWithdrawalSuccessScreen" component={DepositWithdrawalSuccessScreen} />
				<Stack.Screen name="BackupToICloudScreen" component={BackupToICloudScreen} />
				<Stack.Screen name="TopUpWaitScreen" component={TopUpWaitScreen} />
				<Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
