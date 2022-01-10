import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Appbar, Button, List } from 'react-native-paper';
import { RootRouteProps, RootStackParamList } from '@helpers/param-list-type';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from '@hookstate/core';
import { globalContactState, initializeContacts } from '@stores/ContactStore';

export function TransactionContactsScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const route = useRoute<RootRouteProps<'TransactionContacts'>>();
	const state = useState(globalContactState());
	const refreshing = useState(false);
	const onRefresh = useCallback(async () => {
		refreshing.set(true);
		// const newContactList = await initializeContacts();
		state.set(initializeContacts());
		refreshing.set(false);
	}, []);

	const onSelectContact = (address: string) => {
		navigation.navigate('TransactionTransfer', { coin: route.params.coin, address });
	};

	const onAddContact = () => {
		navigation.navigate('ContactCreate');
	};

	const listItem = (c: any) => (
		<List.Item
			title={c.name}
			description={c.address}
			key={c.address}
			right={() => (
				<Button onPress={() => onSelectContact(c.address)} style={{ alignSelf: 'center' }}>
					Select
				</Button>
			)}
		/>
	);
	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header>
				<Appbar.Content title="Select Contact" subtitle={route.params.coin} />
			</Appbar.Header>

			<SafeAreaView style={{ flex: 1 }}>
				<Button
					style={{ width: 150, alignSelf: 'flex-end', margin: 10 }}
					compact
					mode="contained"
					onPress={onAddContact}
				>
					Add contact
				</Button>
				<ScrollView
					contentContainerStyle={{ flex: 1 }}
					refreshControl={<RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />}
				>
					{state.contactList.value?.map(listItem)}
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
