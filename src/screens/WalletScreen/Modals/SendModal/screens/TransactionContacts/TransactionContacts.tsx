import React from 'react';
import { View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Text, Input } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import i18n from '@localization';
import { ContactItem } from '../../components';
import { TransactionContactsProps } from './TransactionContacts.types';
import styles from './TransactionContacts.styles';
import { NoContactsYet } from './NoContactsYet/NoContactsYet';
import { useTransactionContacts } from './TransactionContacts.hooks';

// @TODO: Marcos accept address with a bad format
const TransactionContacts: React.FC<TransactionContactsProps> = ({ onSelected }) => {
	const { contactList, address, setAddress, keyboardVisible, validAddress, onSendAddress } = useTransactionContacts({
		onSelected
	});

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text weight="extraBold" type="h3" center marginBottom={24}>
					{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionContacts.sent_to_address')}
				</Text>
				<Input
					label={i18n.t('WalletScreen.Modals.SendModal.screens.TransactionContacts.address_or_ens')}
					value={address}
					onChangeText={(t: string) => setAddress(t)}
					autoCorrect={false}
					autoCompleteType="off"
					autoCapitalize="none"
					error={address.length > 0 && !validAddress}
					style={{ marginBottom: 24 }}
				/>

				<Button
					title={i18n.t('Components.Buttons.send')}
					disabled={!validAddress}
					onPress={onSendAddress}
					marginBottom={32}
				/>

				{!keyboardVisible &&
					(contactList!.length > 0 ? (
						<>
							<Text center weight="extraBold" type="p" marginBottom={32} style={{ marginTop: 32 }}>
								{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionContacts.choose_from_saved')}
							</Text>
							<FlatList
								style={styles.contactsList}
								keyExtractor={(item, idx) => `${item.address}-${idx}`}
								data={contactList}
								renderItem={({ item }) => (
									<ContactItem contact={item} onSelected={() => onSelected(item)} />
								)}
							/>
						</>
					) : (
						<NoContactsYet />
					))}

				<KeyboardSpacer />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default TransactionContacts;
