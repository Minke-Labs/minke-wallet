/* eslint-disable no-tabs */
import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { smallWalletAddress } from '@src/model/wallet';
import makeBlockie from 'ethereum-blockies-base64';
import Item from './Item';
import { styles } from './TransactionContacts.styles';
// import { useState } from '@hookstate/core';
// import { globalContactState } from '@stores/index';
// const state = useState(globalContactState());

const data = [
	{
		name: 'Alice',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{ name: 'Avelar', address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d' },
	{
		name: 'Romullo',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Linas',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Josh',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Jo',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Jett',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Lyncoln',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Bolinhos',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Marcola',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Amy',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	},
	{
		name: 'Pillar',
		address: '0x667fc4B1eDc5ff96F45Bc382cBfB60b51647948d'
	}
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
				<Item
					onSelected={() => onSelected(item)}
					firstLine={item.name}
					secondLine={smallWalletAddress(item.address)}
					imageSource={{ uri: makeBlockie(item.address) }}
				/>
			)}
		/>
	</View>
);

export default TransactionContacts;
