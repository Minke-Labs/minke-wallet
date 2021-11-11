import {RootRouteProps, RootStackParamList} from "../../App";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Alert, View} from "react-native";
import {Appbar, Button, Card, Text, TextInput} from "react-native-paper";
import React from "react";
import {CommonActions, StackActions, useRoute} from "@react-navigation/native";
import {useState} from "@hookstate/core";
import {parseEther} from "ethers/lib/utils";
import {provider} from "../model/wallet";
import {globalWalletState} from "../stores/WalletStore";
import {isNaN} from "lodash";

export function TransactionTransferScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
    const route = useRoute<RootRouteProps<'TransactionTransfer'>>();
    const amount = useState('');
    const state = globalWalletState();
    const onAmountChange = (text: string) => {
        if (!isNaN(text))
            amount.set(text);

    }
    const onTransfer = async () => {
        const tx = {
            to: route.params.address,
            value: parseEther(amount.value),
        };
        console.log(tx)
        // const estimateGasLimits = await estimateGas();
        // console.log(estimateGasLimits);
        const gasPrice = await provider.getGasPrice()
        // console.log(formatUnits(gasLimit, 'wei'))
        const nonce = await provider.getTransactionCount(state.value.wallet?.address || '', "pending");
        const signedTx = await state.value.wallet?.signTransaction({
            ...tx,
            gasPrice,
            gasLimit: 21000,
            nonce
            // nonce: state.value.wallet.non
        })

        const result = await provider.sendTransaction(signedTx as string).then(r => {
            Alert.alert('Success', 'Transaction successful', [
                {text: 'OK', onPress: () => navigation.dispatch(CommonActions.reset({index: 1, routes: [{name: 'Wallet'}]}))},
            ]);
            return r
        }).catch(err => console.log(err));
        // const result = await sendTransaction(state.value.wallet?.address as string, transferTo.value.to, transferTo.value.amount)
        console.log(result, 'adasdaaaaaaaa')
    }
    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="Transfer"/>
            </Appbar.Header>
            <Card style={{flex: 1, margin: 5}}>
                <Text>Transfer to address: {route.params.address}</Text>
                <TextInput keyboardType={'number-pad'} label={'Amount'} value={amount.value}
                           onChangeText={onAmountChange}/>
                <Button onPress={onTransfer}>Transfer</Button>
            </Card>

        </View>
    )
}
