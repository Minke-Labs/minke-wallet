import React, { useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Button, Text, TextInput } from '@components';
import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { whale3Img } from '@images';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress } from '@models/wallet';
import ContactItem from './Contact/Contact';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionContactsProps {
	onSelected: (item: UserProps) => void;
}

// @TODO: Marcos accept address with a bad format
const TransactionContacts: React.FC<TransactionContactsProps> = ({ onSelected }) => {
	const [address, setAddress] = React.useState('');
	const [keyboardToggle, setKeyboardToggle] = React.useState(false);
	const [ensAddress, setEnsAddress] = React.useState<string>();
	const state = useState(globalContactState());
	const { contactList } = state.value;

	useEffect(() => {
		const lookForENS = async () => {
			if (address && address.includes('.')) {
				setEnsAddress(await resolveENSAddress(address));
			} else {
				setEnsAddress(undefined);
			}
		};
		lookForENS();
	}, [address]);

	const validAddress = !!address && (isAddress(address) || isAddress(ensAddress || ''));

	const onSendAddress = () => {
		if (validAddress) {
			onSelected({ name: address, address });
		}
	};

	React.useEffect(() => {
		console.log('keyboardToggle', keyboardToggle);
	}, [keyboardToggle]);

	return (
		<View style={{ flex: 1, paddingHorizontal: 24 }}>
			<Text weight="extraBold" type="h3" center marginBottom={24}>
				Send to an address
			</Text>
			<TextInput
				label="Address or ENS"
				value={address}
				onChangeText={(t: string) => setAddress(t)}
				autoCorrect={false}
				autoCompleteType="off"
				autoCapitalize="none"
				error={address && !validAddress}
			/>
			<Button title="Send" disabled={!validAddress} onPress={onSendAddress} />

			<Text center weight="extraBold" type="p" marginBottom={32} style={{ marginTop: 32 }}>
				Or choose from a saved address
			</Text>

			{contactList!.length > 0 ? (
				<FlatList
					keyExtractor={(item, idx) => `${item.address}-${idx}`}
					data={contactList}
					renderItem={({ item }) => <ContactItem contact={item} onSelected={() => onSelected(item)} />}
				/>
			) : (
				keyboardToggle && (
					<View
						style={{
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
						<Text type="p2" marginBottom={15}>
							No contacts yet
						</Text>
						<Text weight="bold" type="p2" marginBottom={65}>
							Add some to start
						</Text>
					</View>
				)
			)}

			<KeyboardSpacer onToggle={() => setKeyboardToggle(!keyboardToggle)} />
		</View>
	);
};

export default TransactionContacts;
