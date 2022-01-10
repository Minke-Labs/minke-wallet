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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
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
	const initialScreen = walletState.value?.wallet ? 'Wallet' : 'Welcome';

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
						options={{ headerShown: false }}
						name="ContactCreate"
						component={ContactCreateScreen}
					/>
					<Stack.Screen
						name="Exchange"
						component={ExchangeScreen}
						options={({ navigation }) => ({
							title: '',
							headerLeft: () => (
								<IconButton icon="chevron-left" color="#D0D0D0" onPress={() => navigation.goBack()} />
							)
						})}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
