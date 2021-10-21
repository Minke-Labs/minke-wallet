import React, {useCallback} from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";
import {globalWalletState} from "../stores/WalletStore";
import AppLoading from "expo-app-loading";
import {useState} from "@hookstate/core";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {walletDelete} from "../model/wallet";

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

export function WalletScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {

    const state = useState(globalWalletState);
    console.log('aaaaaaaaaaa')
    if (state.promised)
        return <AppLoading/>;

    const onDeleteWallet = useCallback(async () => {
        await walletDelete(state.value.walletId || '')
        state.set({wallet: null, walletId: null})
        navigation.navigate('Welcome')
    }, [navigation]);

    console.log(state.promised)
    return (
        <View style={styles.container}>

            <Text>{state.value.wallet?.address}</Text>
            <Text>aa</Text>
            <Button title={'Delete'} onPress={onDeleteWallet} />
        </View>
    )
}
