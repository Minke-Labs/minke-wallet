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
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import {BackupScreen} from "./src/screens/BackupScreen";
import {WalletScreen} from "./src/screens/WalletScreen";
import {useState} from "@hookstate/core";
import {Provider as PaperProvider} from 'react-native-paper';
import {globalWalletState} from "./src/stores/WalletStore";

export type RootStackParamList = {
    Welcome: undefined; // undefined because you aren't passing any params to the home screen
    Backup: undefined;
    Wallet: undefined;
};
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
    console.log(walletState.promised)
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
                </Stack.Navigator>

            </NavigationContainer>
        </PaperProvider>
    );
}

