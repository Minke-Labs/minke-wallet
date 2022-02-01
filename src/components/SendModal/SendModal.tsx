/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Modal from '@components/Modal';
import { Portal } from 'react-native-paper';
import { WalletToken } from '@src/model/wallet';
import TransactionContacts from './TransactionContacts/TransactionContacts';
import TransactionSelectFunds from './TransactionSelectFunds/TransactionSelectFunds';
import TransactionTransfer from './TransactionTransfer/TransactionTransfer';
import { styles } from './SendModal.styles';

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
	const [token, setToken] = useState<WalletToken>();

	const handlePress1 = (item: UserProps) => {
		setSelected(selected + 1);
		setUser(item);
	};

	const handlePress2 = (coin: WalletToken) => {
		setSelected(selected + 1);
		setToken(coin);
	};

	useEffect(() => {
		setSelected(0);
	}, [visible]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				onCloseAll={onCloseAll}
				onBack={() => (selected > 0 ? setSelected(selected - 1) : onDismiss())}
			>
				<View style={styles.container}>
					{selected === 0 && <TransactionContacts onSelected={handlePress1} />}
					{selected === 1 && <TransactionSelectFunds user={user} onSelected={handlePress2} />}
					{selected === 2 && token && <TransactionTransfer user={user} token={token} />}
				</View>
			</Modal>
		</Portal>
	);
};

export default WhoToPayModal;
