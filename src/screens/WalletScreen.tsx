import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {useWalletState} from "../stores/WalletStore";
import AppLoading from "expo-app-loading";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        backgroundColor: '#214365',
        width: 268,
        height: 268,
        borderRadius: Dimensions.get('window').width * 0.5,
    },
    button: {
        alignSelf: "stretch",
        marginHorizontal: 20,
        backgroundColor: '#34769D',
        borderRadius: 20,
        // height: 20,
        padding: 20,
    }
});
export function WalletScreen() {

    const state = useWalletState();
    if (state.promised)
        return <AppLoading/>;

    console.log(state.promised)
    return (
        <View style={styles.container}>

        <Text>{state.value.selectedWallet?.address}</Text>
        <Text>aa</Text>
        </View>
    )
}
