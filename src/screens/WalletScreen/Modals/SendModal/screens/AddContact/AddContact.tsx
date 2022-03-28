import React from 'react';
import { View } from 'react-native';
import { Text, Button, Input } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from './AddContact.styles';
import { AddContactProps } from './AddContact.types';
import { useAddContact } from './AddContact.hooks';

const AddContact: React.FC<AddContactProps> = ({ onContactAdded }) => {
	const { name, setName, address, setAddress, ensAddress, validAddress, onContactCreate } = useAddContact({
		onContactAdded
	});

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
