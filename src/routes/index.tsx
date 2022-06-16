import React from 'react';
import { useState } from '@hookstate/core';
import RNUxcam from 'react-native-ux-cam';
import { TransactionsProvider } from '@contexts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	AccountsScreen,
	AssetsScreen,
	ManualBackupScreen,
	BackupSettingsScreen,
	BackupStatusScreen,
	ChangeNetworkScreen,
	ChangeLanguageScreen,
	ChangeCountryScreen,
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
	SavingAccountsScreen,
	Test
} from '@screens';
import { RootStackParamList } from './types.routes';
import { globalWalletState } from '../stores/WalletStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screensObj = {
	AccountsScreen,
	AssetsScreen,
	ManualBackupScreen,
	BackupSettingsScreen,
	ChangeLanguageScreen,
	BackupStatusScreen,
	ChangeNetworkScreen,
	ChangeCountryScreen,
	DepositScreen,
	DepositWithdrawalSuccessScreen,
	ExchangeResumeScreen,
	ExchangeScreen,
	SaveScreen,
	SettingsScreen,
	TransactionsScreen,
	USDCoinScreen,
	WalletAssetsScreen,
	WalletCreatedScreen,
	WalletScreen,
	WelcomeScreen,
	BackupToICloudScreen,
	TopUpWaitScreen,
	WithdrawScreen,
	SavingAccountsScreen,
	Test
};

RNUxcam.setAutomaticScreenNameTagging(false);

const screenNamesArr = Object.keys(screensObj);
screenNamesArr.forEach((screen: string) => {
	RNUxcam.tagScreenName(screen);
});

const Routes: React.FC = () => {
	const walletState = useState(globalWalletState());
	const initialScreen = walletState.value.walletId ? 'WalletScreen' : 'WelcomeScreen';
	// const initialScreen = 'Test';

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
