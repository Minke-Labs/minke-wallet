import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import { useState } from '@hookstate/core';
import { isAddress } from 'ethers/lib/utils';
import { globalContactState } from 'old/src/stores/ContactStore';
import { contactCreate } from 'old/src/model/contact';

export function ContactCreateScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalContactState());
	const name = useState('');
	const address = useState('');

	const onContactCreate = async () => {
		// if (!isAddress(address.value)) {}
		const newContact = await contactCreate(name.value, address.value);
		if (newContact) {
			state.contactList.merge([newContact]);
			navigation.goBack();
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header>
				<Appbar.Content title="Create Contact" />
			</Appbar.Header>
			<Text>{name.value}</Text>
			<TextInput label="Name" onChangeText={(text) => name.set(text)} value={name.value} />
			<TextInput
				style={{ fontSize: 14 }}
				label="Address"
				error={!isAddress(address.value)}
				onChangeText={(text) => address.set(text)}
				value={address.value}
			/>
			<Button onPress={onContactCreate} disabled={Boolean(!name.value.length || !isAddress(address.value))}>
				Create
			</Button>
		</View>
	);
}
