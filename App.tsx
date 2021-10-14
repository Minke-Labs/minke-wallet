import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useRef} from 'react';
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
import {purgeWallets} from "./src/model/wallet";

export type RootStackParamList = {
  Welcome: undefined; // undefined because you aren't passing any params to the home screen
  Backup: undefined;
  Wallet: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    const walletState = useWalletState();
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
purgeWallets().then(d => {
            console.log(d);
            isMounted.current = true
        })


     const initialScreen = walletState.value.selectedWallet ? 'Wallet' : 'Welcome';
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

