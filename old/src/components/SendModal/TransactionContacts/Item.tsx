import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Arrow from '../Arrow';
import { styles } from './TransactionContacts.styles';

interface ItemProps {
	name: string
	address: string
	onSelected: () => void
}

const Item: React.FC<ItemProps> = ({ name, address, onSelected }) => (
	<TouchableOpacity
		style={styles.itemContainer}
		onPress={onSelected}
	>
		<Image
			style={styles.avatar}
			source={require('@assets/wallet-created.png')}
		/>
		<View style={styles.contactTitleContainer}>
			<Text style={styles.contactTitle}>
				{name}
			</Text>
			<Text>
				{`${address.substring(0, 7)}...${address.slice(address.length - 7)}`}
			</Text>
		</View>
		<Arrow />
	</TouchableOpacity>
);

export default Item;
