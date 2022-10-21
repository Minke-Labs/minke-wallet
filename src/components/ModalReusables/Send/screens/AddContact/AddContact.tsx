import React from 'react';
import { View } from 'react-native';
import Input from '@src/components/Input/Input';
import Button from '@src/components/Button/Button';
import Text from '@src/components/Text/Text';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useLanguage } from '@hooks';
import styles from './AddContact.styles';
import { AddContactProps } from './AddContact.types';
import { useTransactionContacts } from '../TransactionContacts/TransactionContacts.hooks';

const AddContact: React.FC<AddContactProps> = ({ onContactAdded }) => {
	const { i18n } = useLanguage();
	const { name, setName, address, setAddress, customDomain, validAddress, onContactCreate } = useTransactionContacts({
		onContactAdded
	});

	return (
		<View style={styles.container}>
			<Text weight="extraBold" type="h3" mb="m">
				{i18n.t('Components.ModalReusables.SendModal.screens.AddContact.add_contact')}
			</Text>
			<Input
				label={i18n.t('Components.Inputs.name')}
				value={name}
				onChangeText={(t) => setName(t)}
				autoCompleteType="off"
				error={name === ''}
				style={{ marginBottom: 24 }}
			/>

			<Input
				label={i18n.t('Components.Inputs.ens_or_wallet')}
				value={address}
				onChangeText={(t) => setAddress(t)}
				autoCorrect={false}
				autoCompleteType="off"
				autoCapitalize="none"
				error={address === '' && customDomain === ''}
				style={{ marginBottom: 24 }}
			/>

			<Button
				title={i18n.t('Components.Buttons.add_contact')}
				onPress={onContactCreate}
				disabled={!(name && validAddress)}
			/>

			<KeyboardSpacer />
		</View>
	);
};

export default AddContact;
