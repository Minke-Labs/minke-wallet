import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
import {initWallet, useWalletState} from "./src/stores/WalletStore";
import {isNull} from "lodash";

export type RootStackParamList = {
  Welcome: undefined; // undefined because you aren't passing any params to the home screen
  Backup: undefined;
  Wallet: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    const walletState = useWalletState();

    let [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic,
    });
    if (!fontsLoaded)
        return <AppLoading/>;


     // console.log(walletState.promised)

     if (walletState.promised)
        return <AppLoading/>;

     const initialScreen = isNull(walletState.value.selectedWallet) ? 'Welcome' : 'Wallet';
     // console.log(walletState.value.selectedWallet, initialScreen)
     // const initialScreen = 'Welcome';

    return (
        <NavigationContainer>
            {/*<StatusBar style={'inverted'} />*/}
            <Stack.Navigator initialRouteName={initialScreen}>
                <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Backup" component={BackupScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Wallet" component={WalletScreen}/>
            </Stack.Navigator>

        </NavigationContainer>
    );
}

