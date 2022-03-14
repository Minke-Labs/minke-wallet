import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@components';
import { useFormProgress } from '@hooks';
import { MinkeToken } from '@models/token';
import styles from './SendModal.styles';
import { TransactionContacts, TransactionSelectFunds, TransactionTransfer, AddContact } from './screens';
import { SendModalProps, UserProps } from './SendModal.types';

const SendModal: React.FC<SendModalProps> = ({ onDismiss, sentSuccessfully, isVisible = false }) => {
	const { currentStep, reset, goForward, goBack } = useFormProgress();
	const [user, setUser] = useState<UserProps>(null!);
	const [token, setToken] = useState<MinkeToken>();
	const [addContactVisible, setAddContactVisible] = useState(false);

	useEffect(() => {
		if (!isVisible) {
			reset();
			setAddContactVisible(false);
		}
	}, [isVisible]);

	const onUserSelected = (item: UserProps) => {
		goForward();
		setUser(item);
		setAddContactVisible(true);
	};

	const onTokenSelected = (coin: MinkeToken) => {
		goForward();
		setToken(coin);
	};

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
