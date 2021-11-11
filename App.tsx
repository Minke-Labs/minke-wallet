import React, {useRef} from 'react';

import {
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
    useFonts,
} from '@expo-google-fonts/dm-sans';
import AppLoading from "expo-app-loading";
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import {BackupScreen} from "./src/screens/BackupScreen";
import {WalletScreen} from "./src/screens/WalletScreen";
import {useState} from "@hookstate/core";
import {Provider as PaperProvider} from 'react-native-paper';
import {globalWalletState} from "./src/stores/WalletStore";
import {TransactionSelectFundsScreen} from "./src/screens/TransactionSelectFundsScreen";
import {TransactionContactsScreen} from "./src/screens/TransactionContactsScreen";
import {TransactionTransferScreen} from "./src/screens/TransactionTransferScreen";

export type RootStackParamList = {
    Welcome: undefined; // undefined because you aren't passing any params to the home screen
    Backup: undefined;
    Wallet: undefined;
    TransactionSelectFunds: undefined;
    TransactionContacts: {coin: string};
    TransactionTransfer: {coin: string, address: string};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    // const initWalletState = useState(initializeWallet)
    const walletState = useState(globalWalletState());
    const isMounted = useRef<any>(null);
    let [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic,
    });
    if (!fontsLoaded || walletState.promised)
        return <AppLoading/>;
    // console.log('INIT VALLET',walletState.value?.wallet)
    // if (initWalletState.value?.privateKey) {
    //     walletState.set({wallet: new Wallet(initWalletState.value.privateKey), walletId: initWalletState.value.id})
    // }
    const initialScreen = walletState.value?.wallet ? 'Wallet' : 'Welcome';
    // console.log(walletState.value.selectedWallet, initialScreen)
    // const initialScreen = 'Welcome';

    return (
        <PaperProvider>
            <NavigationContainer>
                {/*<StatusBar style={'inverted'} />*/}
                <Stack.Navigator initialRouteName={initialScreen}>
                    <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>
                    <Stack.Screen options={{headerShown: false}} name="Backup" component={BackupScreen}/>
                    <Stack.Screen options={{headerShown: false}} name="Wallet" component={WalletScreen}/>
                    <Stack.Screen options={{headerShown: false}} name="TransactionSelectFunds" component={TransactionSelectFundsScreen}/>
                    <Stack.Screen options={{headerShown: false}} initialParams={{coin: 'eth'}} name="TransactionContacts" component={TransactionContactsScreen}/>
                    <Stack.Screen options={{headerShown: false}} name="TransactionTransfer" component={TransactionTransferScreen}/>
                </Stack.Navigator>

            </NavigationContainer>
        </PaperProvider>
    );
}

