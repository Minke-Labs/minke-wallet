import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useState } from '@hookstate/core';
import TextInput from '@src/components/TextInput/TextInput';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PrimaryButton from '@src/components/PrimaryButton';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress } from '@src/model/wallet';
import { contactCreate } from '@models/contact';
import { globalContactState } from '@src/stores/ContactStore';
import styles from './AddContact.styles';

const AddContact = ({ onContactAdded }: { onContactAdded: () => void }) => {
	const state = useState(globalContactState());
	const [name, setName] = React.useState<string>();
	const [address, setAddress] = React.useState<string>();
	const [ensAddress, setEnsAddress] = React.useState<string>();

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
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>Add Contact</Text>
			<TextInput
				label="Name"
				value={name}
				onChangeText={(t) => setName(t)}
				autoCompleteType="off"
				error={name === ''}
			/>

			<TextInput
				label="ENS or Wallet Address"
				value={address}
				onChangeText={(t) => setAddress(t)}
				autoCorrect={false}
				autoCompleteType="off"
				autoCapitalize="none"
				error={address === '' && ensAddress === ''}
			/>

			<PrimaryButton disabled={!(name && validAddress)} style={styles.button} onPress={onContactCreate}>
				Add Contact
			</PrimaryButton>
			<KeyboardSpacer />
		</View>
	);
};

export default AddContact;
