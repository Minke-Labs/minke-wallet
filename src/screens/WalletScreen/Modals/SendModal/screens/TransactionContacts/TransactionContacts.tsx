import React, { useEffect } from 'react';
import { View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Text, Input } from '@components';
import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress, smallWalletAddress } from '@models/wallet';
import { useKeyboard, useWallets } from '@hooks';
import { ContactItem } from '../../components';
import { TransactionContactsProps } from './TransactionContacts.types';
import styles from './TransactionContacts.styles';
import { NoContactsYet } from './NoContactsYet/NoContactsYet';

// @TODO: Marcos accept address with a bad format
const TransactionContacts: React.FC<TransactionContactsProps> = ({ onSelected }) => {
	const [address, setAddress] = React.useState('');
	const [ensAddress, setEnsAddress] = React.useState<string>();
	const state = useState(globalContactState());
	const { contactList } = state.value;
	const keyboardVisible = useKeyboard();
	const { wallets, address: selectedAddress } = useWallets();
	const availableAddresses = Object.values(wallets || []).filter((wallet) => wallet.address !== selectedAddress);

	useEffect(() => {
		const lookForENS = async () => {
			if (address && address.includes('.')) {
				setEnsAddress((await resolveENSAddress(address)) || undefined);
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

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text weight="extraBold" type="h3" center marginBottom={24}>
					Send to an address
				</Text>
				<Input
					label="Address or ENS"
					value={address}
					onChangeText={(t: string) => setAddress(t)}
					autoCorrect={false}
					autoCompleteType="off"
					autoCapitalize="none"
					error={address.length > 0 && !validAddress}
					style={{ marginBottom: 24 }}
				/>

				<Button title="Send" disabled={!validAddress} onPress={onSendAddress} marginBottom={32} />

				{!keyboardVisible &&
					(contactList!.length > 0 || availableAddresses.length > 0 ? (
						<>
							<Text center weight="extraBold" type="p" marginBottom={32} style={{ marginTop: 32 }}>
								Or choose from a saved address
							</Text>
							<FlatList
								style={styles.contactsList}
								keyExtractor={(item, idx) => `${item.address}-${idx}`}
								data={contactList}
								renderItem={({ item }) => (
									<ContactItem contact={item} onSelected={() => onSelected(item)} />
								)}
							/>
							{availableAddresses.length > 0 && (
								<FlatList
									style={styles.contactsList}
									keyExtractor={(item, idx) => `${item.address}-${idx}`}
									data={availableAddresses}
									renderItem={({ item }) => {
										const contact = {
											address: item.address,
											name: smallWalletAddress(item.address, 9)
										};
										return <ContactItem contact={contact} onSelected={() => onSelected(contact)} />;
									}}
								/>
							)}
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
