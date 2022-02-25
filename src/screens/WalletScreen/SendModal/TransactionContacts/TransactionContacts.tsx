import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { Button, Text, TextInput } from '@components';
import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { whale3Img } from '@images';
import { isAddress } from 'ethers/lib/utils';
import ContactItem from './Contact/Contact';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionContactsProps {
	onSelected: (item: UserProps) => void;
}

const TransactionContacts: React.FC<TransactionContactsProps> = ({ onSelected }) => {
	const [address, setAddress] = React.useState<string>('');
	const state = useState(globalContactState());
	const { contactList } = state.value;

	const validAddress = !!address && (isAddress(address) || '');

	const onSendAddress = () => {
		if (validAddress) {
			onSelected({ name: address, address });
		}
	};

	return (
		<View style={{ flex: 1, paddingHorizontal: 24 }}>
			<Text weight="extraBold" type="h3" center marginBottom={24}>Send to some address</Text>
			<TextInput
				label="0x..."
				value={address}
				onChangeText={(t) => setAddress(t)}
				autoCorrect={false}
				autoCompleteType="off"
				autoCapitalize="none"
				error={address === ''}
			/>
			<Button
				title="Send"
				disabled={!address}
				onPress={onSendAddress}
			/>

			<Text
				center
				weight="extraBold"
				type="p"
				marginBottom={32}
				style={{ marginTop: 32 }}
			>
				Or choose from a saved address
			</Text>

			{
				contactList!.length > 0 ? (
					<FlatList
						keyExtractor={(item, idx) => `${item.address}-${idx}`}
						data={contactList}
						renderItem={({ item }) =>
							<ContactItem
								contact={item}
								onSelected={() => onSelected(item)}
							/>}
					/>
				) : (
					<View style={{
						flex: 1,
						alignItems: 'center',
						paddingHorizontal: 24
					}}
					>
						<Image
							source={whale3Img}
							style={{
								width: 147,
								height: 137,
								marginBottom: 32
							}}
						/>
						<Text type="p2" marginBottom={15}>No contacts yet</Text>
						<Text weight="bold" type="p2" marginBottom={65}>Add some to start</Text>
					</View>
				)
			}

			<KeyboardSpacer />
		</View>
	);
};

export default TransactionContacts;
