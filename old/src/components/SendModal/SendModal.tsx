/* eslint-disable no-console */
import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'old/src/components/Modal';
import { Portal } from 'react-native-paper';
import { styles } from './SendModal.styles';
import TransactionContacts from './TransactionContacts/TransactionContacts';
import TransactionSelectFunds from './TransactionSelectFunds/TransactionSelectFunds';
import TransactionTransfer from './TransactionTransfer/TransactionTransfer';

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
	const [user, setUser] = useState<UserProps>(null!);
	const [coin, setCoin] = useState('');

	const handlePress1 = (item: UserProps) => {
		setSelected(selected + 1);
		setUser(item);
	};

	const handlePress2 = (name: string) => {
		setSelected(selected + 1);
		setCoin(name);
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				onCloseAll={onCloseAll}
				onBack={() => setSelected(selected > 0 ? selected - 1 : 0)}
			>
				<View style={styles.container}>
					{selected === 0 && (
						<TransactionContacts
							onSelected={handlePress1}
						/>
					)}
					{
						selected === 1 && (
							<TransactionSelectFunds
								user={user} // TODO: use it to get the user's balance
								onSelected={handlePress2}
							/>
						)
					}
					{
						selected === 2 && (
							<TransactionTransfer
								user={user}
								coin={coin}
							/>
						)
					}
				</View>
			</Modal>
		</Portal>
	);
};

export default WhoToPayModal;
