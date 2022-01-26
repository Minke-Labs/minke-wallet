import React from 'react';

import {
	Inter_400Regular,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_500Medium,
	useFonts
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import WelcomeScreen from './src/screens/welcome-flow/welcome/WelcomeScreen';
import { WalletCreatedScreen } from './src/screens/welcome-flow/wallet-created/WalletCreatedScreen';
import { BackupScreen } from './src/screens/welcome-flow/manual-backup/BackupScreen';
import { WalletScreen } from './src/screens/home/WalletScreen';
import { globalWalletState } from './src/stores/WalletStore';
import { TransactionSelectFundsScreen } from './src/screens/TransactionSelectFundsScreen';
import { TransactionContactsScreen } from './src/screens/TransactionContactsScreen';
import { TransactionTransferScreen } from './src/screens/TransactionTransferScreen';
import { ContactCreateScreen } from './src/screens/ContactCreateScreen';
import ExchangeScreen from './src/screens/exchange/ExchangeScreen';
import ExchangeResumeScreen from './src/screens/exchange/ExchangeResumeScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import ChangeNetworkScreen from './src/screens/settings/network/ChangeNetworkScreen';
import AccountsScreen from './src/screens/settings/accounts/AccountsScreen';
import BackupSettingsScreen from './src/screens/settings/backup/BackupSettingsScreen';
import { darkTheme, lightTheme } from './src/helpers/themes';
import { RootStackParamList } from './src/helpers/param-list-type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const scheme = useColorScheme();
	const walletState = useState(globalWalletState());
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_500Medium
	});
	if (!fontsLoaded || walletState.promised) return <AppLoading />;
	const initialScreen = walletState.value.walletId ? 'Wallet' : 'Welcome';

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
		<PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={initialScreen}>
					<Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
					<Stack.Screen
						options={{ headerShown: false }}
						name="WalletCreated"
						component={WalletCreatedScreen}
					/>
					<Stack.Screen options={{ headerShown: false }} name="Backup" component={BackupScreen} />
					<Stack.Screen options={{ headerShown: false }} name="Wallet" component={WalletScreen} />
					<Stack.Screen name="TransactionSelectFunds" component={TransactionSelectFundsScreen} />
					<Stack.Screen
						options={{ headerShown: false }}
						initialParams={{ coin: 'eth' }}
						name="TransactionContacts"
						component={TransactionContactsScreen}
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name="TransactionTransfer"
						component={TransactionTransferScreen}
					/>
					<Stack.Screen
						options={(props) => defaultOptions(props)}
						name="ContactCreate"
						component={ContactCreateScreen}
					/>
					<Stack.Screen
						name="Exchange"
						component={ExchangeScreen}
						options={(props) => defaultOptions(props)}
					/>
					<Stack.Screen
						name="ExchangeResume"
						component={ExchangeResumeScreen}
						options={(props) => defaultOptions(props)}
					/>
					<Stack.Screen
						name="Settings"
						component={SettingsScreen}
						options={(props) => defaultOptions(props)}
					/>
					<Stack.Screen
						name="ChangeNetwork"
						component={ChangeNetworkScreen}
						options={(props) => defaultOptions(props)}
					/>
					<Stack.Screen
						name="Accounts"
						component={AccountsScreen}
						options={(props) => defaultOptions(props)}
					/>

					<Stack.Screen
						name="BackupSettings"
						component={BackupSettingsScreen}
						options={(props) => defaultOptions(props)}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
