import React, {useCallback} from "react";
import {View, Text, Button} from "react-native";
import {globalWalletState} from "../stores/WalletStore";
import {loadObject} from "../model/keychain";
import {useState} from "@hookstate/core";
import AppLoading from "expo-app-loading";
import Container from "../components/Container";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {getSeedPhrase} from "../model/wallet";

export function BackupScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
     const walletState = useState(globalWalletState);
          const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

     const loadSeed = getSeedPhrase(walletState.value.walletId || '')
     const seed = useState(loadSeed);
     if (seed.promised)
        return <AppLoading/>;
    return (
        <Container>

        <Text>{seed.value}</Text>
            <Button title={'Done'} onPress={onFinish}>Finish</Button>
        </Container>
    )
}
