import React, {useCallback} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Appbar, Button, Card, Text, TextInput} from 'react-native-paper';
import {globalWalletState} from "../stores/WalletStore";
import AppLoading from "expo-app-loading";
import {useState} from "@hookstate/core";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {walletDelete} from "../model/wallet";
import {BigNumberish, utils} from "ethers";
import {isNaN} from "lodash";

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

    const state = useState(globalWalletState());
    const transferTo = useState({to: '', amount: ''})
    if (state.promised)
        return <AppLoading/>;


    const onDeleteWallet = useCallback(async () => {
        await walletDelete(state.value?.walletId || '')
        state.set({wallet: null, walletId: null})
        navigation.navigate('Welcome')
    }, [navigation]);

    const onAmountChange = (text: string) => {
        if (!isNaN(text))
            transferTo.amount.set(text);

    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Minke Wallet"/>
            </Appbar.Header>
            <Card style={{padding: 20}}>

                <Text>{state.value.wallet?.address}</Text>
                <Text>aa</Text>
                <Text>Balance: {utils.formatEther(state.value.balance as BigNumberish)}</Text>
                <TextInput label={'Transfer To'} value={transferTo.value.to}
                           onChangeText={address => transferTo.to.set(address)}/>
                <TextInput keyboardType={'number-pad'} label={'Amount'} value={transferTo.amount.value}
                           onChangeText={onAmountChange}/>
                <Button onPress={onDeleteWallet}>Delete</Button>
            </Card>
        </View>
    )
}
