import {RootRouteProps, RootStackParamList} from "../../App";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Appbar, Button, Card, List} from "react-native-paper";
import {View} from "react-native";
import React from "react";
import {useRoute} from "@react-navigation/native";
import {useState} from "@hookstate/core";

export function TransactionContactsScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
    const route = useRoute<RootRouteProps<'TransactionContacts'>>();
    const contacts = useState([{name: 'Josh', address: '0x3373de017bC18233f8B863E38E508A154EcF7d71'}])
    const onSelectContact = (address: string) => {
        navigation.navigate('TransactionTransfer', {coin: route.params.coin, address})
    }
    return (
        <View  style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="Select Contact" subtitle={route.params.coin}/>

            </Appbar.Header>

            <Card  style={{flex: 1}}>

                <Button style={{width: 150, alignSelf: 'flex-end', margin: 10}} compact={true} mode={'contained'}>Add contact</Button>
                {contacts.value.map(c => <List.Item title={c.name} description={c.address} right={props => <Button onPress={() => onSelectContact(c.address)} style={{alignSelf: "center"}}>Select</Button>}/>)}

            </Card>
        </View>
    )
}
