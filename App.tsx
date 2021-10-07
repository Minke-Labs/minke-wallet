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

export type RootStackParamList = {
  Welcome: undefined, // undefined because you aren't passing any params to the home screen
  Backup: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
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

    return (
        <NavigationContainer>
            {/*<StatusBar style={'inverted'} />*/}
            <Stack.Navigator initialRouteName={'Welcome'}>
                <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Backup" component={BackupScreen}/>
            </Stack.Navigator>

        </NavigationContainer>
    );
}

