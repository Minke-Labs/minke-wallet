/* eslint-disable no-console */
/* eslint-disable no-tabs */
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import Item from './Item';
import { styles } from './TransactionContacts.styles';
// import { useState } from '@hookstate/core';
// import { globalContactState } from '@stores/index';
// const state = useState(globalContactState());

const data = [
	{ name: 'Devin', address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b' },
	{
		name: 'Dan',
		address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	},
	{
		name: 'Dominic',
		address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	},
	{
		name: 'Jackson',
		address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	},
	{
		name: 'James',
		address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	}
	// {
	// 	name: 'Joel',
	// 	address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	// },
	// {
	// 	name: 'John',
	// 	address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	// },
	// {
	// 	name: 'Jillian',
	// 	address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	// },
	// {
	// 	name: 'Jimmy',
	// 	address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	// },
	// {
	// 	name: 'Julie',
	// 	address: '0x29aCe6cF2D4519d3aD9875Fa0d8fAfc4460f6e0b'
	// }
];

interface UserProps {
	name: string;
	address: string;
}

interface TransactionContactsProps {
	onSelected: (item: UserProps) => void;
}

const TransactionContacts: React.FC<TransactionContactsProps> = ({ onSelected }) => (
	<View style={{ flex: 1 }}>
		<Text style={styles.title}>Who to send</Text>
		<FlatList
			keyExtractor={(item, idx) => `${item.address}-${idx}`}
			data={data}
			renderItem={({ item }) => (
				<Item onSelected={() => onSelected(item)} name={item.name} address={item.address} />
			)}
		/>
	</View>
);

export default TransactionContacts;
