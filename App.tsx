import React, { useRef } from 'react';

import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
  useFonts
} from '@expo-google-fonts/dm-sans';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/welcome-flow/welcome/WelcomeScreen';
import WalletCreatedScreen from './src/screens/welcome-flow/wallet-created/WalletCreatedScreen';
import { BackupScreen } from './src/screens/welcome-flow/manual-backup/BackupScreen';
import { WalletScreen } from './src/screens/WalletScreen';
import { useState } from '@hookstate/core';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { globalWalletState } from './src/stores/WalletStore';
import { TransactionSelectFundsScreen } from './src/screens/TransactionSelectFundsScreen';
import { TransactionContactsScreen } from './src/screens/TransactionContactsScreen';
import { TransactionTransferScreen } from './src/screens/TransactionTransferScreen';
import { ContactCreateScreen } from './src/screens/ContactCreateScreen';
import { darkTheme, lightTheme } from './src/helpers/themes';

export type RootStackParamList = {
  Welcome: undefined; // undefined because you aren't passing any params to the home screen
  Backup: undefined;
  Wallet: undefined;
  WalletCreated: undefined;
  TransactionSelectFunds: undefined;
  TransactionContacts: { coin: string };
  TransactionTransfer: { coin: string; address: string };
  ContactCreate: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const scheme = useColorScheme();
  const walletState = useState(globalWalletState());
  const isMounted = useRef<any>(null);
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic
  });
  if (!fontsLoaded || walletState.promised) return <AppLoading />;
  const initialScreen = walletState.value?.wallet ? 'Wallet' : 'Welcome';

  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="WalletCreated"
            component={WalletCreatedScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Backup"
            component={BackupScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Wallet"
            component={WalletScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="TransactionSelectFunds"
            component={TransactionSelectFundsScreen}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
