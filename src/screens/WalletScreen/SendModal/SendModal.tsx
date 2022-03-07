import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@components';
import { useFormProgress } from '@hooks';
import { WalletToken } from '@src/model/wallet';
import { styles } from './SendModal.styles';
import TransactionContacts from './TransactionContacts/TransactionContacts';
import AddContact from './TransactionContacts/AddContact/AddContact';
import TransactionTransfer from './TransactionTransfer/TransactionTransfer';
import TransactionSelectFunds from './TransactionSelectFunds/TransactionSelectFunds';

interface UserProps {
	name: string;
	address: string;
}

type ResultProps = {
	link: string;
	symbol: string;
};

interface Props {
	onDismiss: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
	isVisible: boolean;
}

const SendModal: React.FC<Props> = ({ onDismiss, sentSuccessfully, isVisible = false }) => {
	const { currentStep, goForward, goBack, reset } = useFormProgress();
	const [user, setUser] = useState<UserProps>(null!);
	const [token, setToken] = useState<WalletToken>();
	const [addContactVisible, setAddContactVisible] = useState(false);

	const onUserSelected = (item: UserProps) => {
		goForward();
		setUser(item);
		setAddContactVisible(true);
	};

	const onTokenSelected = (coin: WalletToken) => {
		goForward();
		setToken(coin);
	};

	useEffect(() => {
		if (!isVisible) {
			reset();
			setAddContactVisible(false);
		}
	}, [isVisible]);

	const onBack = () => (currentStep > 0 ? goBack() : onDismiss());
	const onContactsBack = () => (addContactVisible ? setAddContactVisible(false) : onBack());

	return (
		<SafeAreaView>
			<View style={styles.header}>
				<TouchableOpacity onPress={onContactsBack} activeOpacity={0.8}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</TouchableOpacity>
				{currentStep === 0 && !addContactVisible ? (
					<TouchableOpacity onPress={() => setAddContactVisible(true)} activeOpacity={0.8}>
						<Text type="a" color="text7" weight="medium">
							+ Add
						</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
						<Icon name="closeStroke" size={24} color="text7" />
					</TouchableOpacity>
				)}
			</View>

			{currentStep === 0 &&
				(addContactVisible ? (
					<AddContact onContactAdded={() => setAddContactVisible(false)} />
				) : (
					<TransactionContacts onSelected={onUserSelected} />
				))}

			{currentStep === 1 && <TransactionSelectFunds user={user} onSelected={onTokenSelected} />}

			{currentStep === 2 && token && <TransactionTransfer {...{ user, token, onDismiss, sentSuccessfully }} />}
		</SafeAreaView>
	);
};

export default SendModal;
