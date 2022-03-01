/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
// import Modal from '@components/Modal';
import { Portal } from 'react-native-paper';
import { WalletToken } from '@src/model/wallet';
import TransactionContacts from './TransactionContacts/TransactionContacts';
import TransactionSelectFunds from './TransactionSelectFunds/TransactionSelectFunds';
import TransactionTransfer from './TransactionTransfer/TransactionTransfer';
import AddContact from './TransactionContacts/AddContact/AddContact';
import { styles } from './SendModal.styles';
import PrimaryButton from '../PrimaryButton';

interface Props {
	visible: boolean;
	onDismiss: () => void;
	onCloseAll: () => void;
	// onBack: () => void;
}

interface UserProps {
	name: string;
	address: string;
}

const WhoToPayModal: React.FC<Props> = ({ visible, onDismiss, onCloseAll }) => {
	const [selected, setSelected] = useState(0);
	const [addContactVisible, setAddContactVisible] = useState(false);
	const [user, setUser] = useState<UserProps>(null!);
	const [token, setToken] = useState<WalletToken>();

	const onUserSelected = (item: UserProps) => {
		setSelected(selected + 1);
		setUser(item);
	};

	const onTokenSelected = (coin: WalletToken) => {
		setSelected(selected + 1);
		setToken(coin);
	};

	useEffect(() => {
		setSelected(0);
		setAddContactVisible(false);
	}, [visible]);

	const onBack = () => (selected > 0 ? setSelected(selected - 1) : onDismiss());
	const onContactsBack = () => (addContactVisible ? setAddContactVisible(false) : onBack());

	return (
		<Portal>
			<Modal
				visible={visible && selected === 0}
				onDismiss={onDismiss}
				onCloseAll={addContactVisible && onCloseAll}
				right={
					!addContactVisible && (
						<PrimaryButton mode="text" onPress={() => setAddContactVisible(true)}>
							+ Add
						</PrimaryButton>
					)
				}
				onBack={onContactsBack}
			>
				{addContactVisible ? (
					<View style={styles.container}>
						<AddContact onContactAdded={() => setAddContactVisible(false)} />
					</View>
				) : (
					<View style={styles.smallContainer}>
						<TransactionContacts onSelected={onUserSelected} />
					</View>
				)}
			</Modal>








			<Modal visible={visible && selected === 1} onDismiss={onDismiss} onCloseAll={onCloseAll} onBack={onBack}>
				<View style={styles.smallContainer}>
					<TransactionSelectFunds user={user} onSelected={onTokenSelected} />
				</View>
			</Modal>















			<Modal visible={visible && selected === 2} onDismiss={onDismiss} onCloseAll={onCloseAll} onBack={onBack}>
				<View style={styles.container}>{token && <TransactionTransfer user={user} token={token} />}</View>
			</Modal>
		</Portal>
	);
};

export default WhoToPayModal;