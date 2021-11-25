import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Appbar, Button, Card} from "react-native-paper";
import {RootStackParamList} from "../../App";
import React from "react";
import {Text, View} from "react-native";
import {globalWalletState} from "../stores/WalletStore";
import {formatEther, formatUnits} from "ethers/lib/utils";
import {BigNumberish} from "ethers";
import { formatFixed } from "@ethersproject/bignumber";

export function TransactionSelectFundsScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
    const wallet = globalWalletState();
    const onSelectFunds = () => {
        navigation.navigate('TransactionContacts', {coin: 'eth'})
    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Select Funds"/>
            </Appbar.Header>
            <Card style={{padding: 20}}>


                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <View>
                        <Text>Ethereum</Text>
                        <Text>Balance: {wallet.value.balance ? formatEther(wallet.value.balance.eth as BigNumberish) : ''}</Text>
                        <Text>Balance USD: {wallet.value.balance?.usd}</Text>
                    </View>

                    <Button mode={'contained'} onPress={onSelectFunds}>Select</Button>

                </View>
            </Card>
        </View>
    )
}
