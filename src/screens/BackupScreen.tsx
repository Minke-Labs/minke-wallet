import React, {useCallback} from "react";
import {View, Text, Button} from "react-native";
import {useWalletState} from "../stores/WalletStore";
import {loadObject} from "../model/keychain";
import {useState} from "@hookstate/core";
import AppLoading from "expo-app-loading";
import Container from "../components/Container";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

export function BackupScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
     const walletState = useWalletState();
     const loadSeed = loadObject(`${walletState.value.selectedWallet?.id}_minkeSeedPhrase`) as Promise<{id: string, seedPhrase: string}>;
     const seed = useState(loadSeed);
     const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);
     if (seed.promised)
        return <AppLoading/>;
    return (
        <Container>

        <Text>{seed.value.seedPhrase}</Text>
            <Button title={'Done'} onPress={onFinish}>Finish</Button>
        </Container>
    )
}
