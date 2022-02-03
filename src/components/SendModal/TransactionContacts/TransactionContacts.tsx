import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';
import ContactItem from './Contact/Contact';
import { styles } from './TransactionContacts.styles';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionContactsProps {
	onSelected: (item: UserProps) => void;
}

const TransactionContacts: React.FC<TransactionContactsProps> = ({ onSelected }) => {
	const state = useState(globalContactState());
	const { contactList } = state.value;

	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>Who to send</Text>
			<FlatList
				keyExtractor={(item, idx) => `${item.address}-${idx}`}
				data={contactList}
				renderItem={({ item }) => <ContactItem contact={item} onSelected={() => onSelected(item)} />}
			/>
		</View>
	);
};

export default TransactionContacts;
