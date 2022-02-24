import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@components';
import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';
import ContactItem from './Contact/Contact';

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
		<View style={{ flex: 1, paddingHorizontal: 24 }}>
			<Text weight="extraBold" type="h3" marginBottom={32}>Who to send</Text>
			<FlatList
				keyExtractor={(item, idx) => `${item.address}-${idx}`}
				data={contactList}
				renderItem={({ item }) =>
					<ContactItem
						contact={item}
						onSelected={() => onSelected(item)}
					/>}
			/>
		</View>
	);
};

export default TransactionContacts;
