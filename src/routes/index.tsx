import React from 'react';
import { useState } from '@hookstate/core';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import {
	AccountsScreen,
	AssetsScreen,
	BackupScreen,
	BackupSettingsScreen,
	ChangeNetworkScreen,
	ContactCreateScreen,
	ExchangeResumeScreen,
	ExchangeScreen,
	SettingsScreen,
	TransactionContactsScreen,
	TransactionSelectFundsScreen,
	TransactionsScreen,
	TransactionTransferScreen,
	WalletAssets,
	WalletCreatedScreen,
	WalletScreen,
	WelcomeScreen,
	SaveScreen,
	OpenAaveScreen,
	Test
} from '@screens';
import { RootStackParamList } from './types.routes';
import { globalWalletState } from '../stores/WalletStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
	const scheme = useColorScheme();
	const walletState = useState(globalWalletState());
	const initialScreen = walletState.value.walletId ? 'Wallet' : 'Welcome';
	// const initialScreen = walletState.value.walletId ? 'Test' : 'Test';

	const defaultOptions = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => ({
		title: '',
		headerStyle: {
			backgroundColor: scheme === 'dark' ? '#0A2138' : '#F2EAE1'
		},
		headerShadowVisible: false,
		headerLeft: () => (
			<MaterialIcons
				name="arrow-back-ios"
				size={24}
				color={scheme === 'dark' ? '#FFFFFF' : '#006AA6'}
				onPress={() => navigation.goBack()}
			/>
		)
	});

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="Assets" component={AssetsScreen} />
				<Stack.Screen name="Test" component={Test} />
				<Stack.Screen name="WalletCreated" component={WalletCreatedScreen} />
				<Stack.Screen name="Backup" component={BackupScreen} />
				<Stack.Screen name="Wallet" component={WalletScreen} />
				<Stack.Screen name="WalletAssets" component={WalletAssets} />
				<Stack.Screen name="TransactionSelectFunds" component={TransactionSelectFundsScreen} />
				<Stack.Screen
					initialParams={{ coin: 'eth' }}
					name="TransactionContacts"
					component={TransactionContactsScreen}
				/>
				<Stack.Screen name="TransactionTransfer" component={TransactionTransferScreen} />
				<Stack.Screen
					options={(props) => defaultOptions(props)}
					name="ContactCreate"
					component={ContactCreateScreen}
				/>
				<Stack.Screen name="Exchange" component={ExchangeScreen} options={(props) => defaultOptions(props)} />
				<Stack.Screen
					name="ExchangeResume"
					component={ExchangeResumeScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen name="Settings" component={SettingsScreen} />
				<Stack.Screen name="ChangeNetwork" component={ChangeNetworkScreen} />

				<Stack.Screen name="Accounts" component={AccountsScreen} />

				<Stack.Screen name="BackupSettings" component={BackupSettingsScreen} />
				<Stack.Screen
					name="Transactions"
					component={TransactionsScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen name="Save" component={SaveScreen} />
				<Stack.Screen name="OpenAave" component={OpenAaveScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
