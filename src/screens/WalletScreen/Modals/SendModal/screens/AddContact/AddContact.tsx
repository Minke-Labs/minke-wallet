import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button, Input } from '@components';
import { useState } from '@hookstate/core';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress } from '@src/model/wallet';
import { contactCreate } from '@models/contact';
import { globalContactState } from '@src/stores/ContactStore';
import styles from './AddContact.styles';
import { AddContactProps } from './AddContact.types';

const AddContact: React.FC<AddContactProps> = ({ onContactAdded }) => {
	const state = useState(globalContactState());
	const [name, setName] = React.useState<string>();
	const [address, setAddress] = React.useState<string>();
	const [ensAddress, setEnsAddress] = React.useState<string>();

	useEffect(() => {
		const lookForENS = async () => {
			if (address && address.includes('.')) {
				const resolvedAddress = await resolveENSAddress(address);
				setEnsAddress(resolvedAddress!);
			} else {
				setEnsAddress(undefined);
			}
		};
		lookForENS();
	}, [address]);

	const validAddress = !!address && (isAddress(address) || isAddress(ensAddress || ''));

	const onContactCreate = async () => {
		if (name && validAddress) {
			const newContact = await contactCreate(name, address);
			if (newContact) {
				state.contactList.merge([newContact]);
				onContactAdded();
			}
		}
	};

	return (
		<View style={styles.container}>
			<Text weight="extraBold" type="h3" marginBottom={32}>
				Add Contact
			</Text>
			<Input
				label="Name"
				value={name}
				onChangeText={(t) => setName(t)}
				autoCompleteType="off"
				error={name === ''}
				style={{ marginBottom: 24 }}
			/>

			<Input
				label="ENS or Wallet Address"
				value={address}
				onChangeText={(t) => setAddress(t)}
				autoCorrect={false}
				autoCompleteType="off"
				autoCapitalize="none"
				error={address === '' && ensAddress === ''}
				style={{ marginBottom: 24 }}
			/>

			<Button title="Add Contact" onPress={onContactCreate} disabled={!(name && validAddress)} />

			<KeyboardSpacer />
		</View>
	);
};

export default AddContact;
