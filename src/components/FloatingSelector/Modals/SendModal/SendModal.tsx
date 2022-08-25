import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Icon, Text, Touchable } from '@components';
import { useLanguage } from '@hooks';
import styles from './SendModal.styles';
import { TransactionContacts, TransactionSelectFunds, TransactionTransfer, AddContact } from './screens';
import { SendModalProps } from './SendModal.types';
import { useSendModal } from './SendModal.hooks';

const SendModal: React.FC<SendModalProps> = ({ onDismiss, onError, sentSuccessfully, isVisible = false }) => {
	const {
		currentStep,
		user,
		token,
		addContactVisible,
		setAddContactVisible,
		onUserSelected,
		onTokenSelected,
		onContactsBack
	} = useSendModal({ isVisible, onDismiss });
	const { i18n } = useLanguage();

	return (
		<SafeAreaView>
			<View style={styles.header}>
				<Touchable onPress={onContactsBack}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</Touchable>
				{currentStep === 0 && !addContactVisible ? (
					<Touchable onPress={() => setAddContactVisible(true)}>
						<Text type="a" color="text7" weight="medium">
							{i18n.t('WalletScreen.Modals.SendModal.add')}
						</Text>
					</Touchable>
				) : (
					<Touchable onPress={onDismiss}>
						<Icon name="close" size={24} color="text7" />
					</Touchable>
				)}
			</View>

			{currentStep === 0 &&
				(addContactVisible ? (
					<AddContact onContactAdded={() => setAddContactVisible(false)} />
				) : (
					<TransactionContacts onSelected={onUserSelected} />
				))}

			{currentStep === 1 && (
				<TransactionSelectFunds
					user={user}
					onSelected={onTokenSelected}
				/>
			)}

			{currentStep === 2 && token && (
				<TransactionTransfer
					{...{
						user,
						token,
						onDismiss,
						onError,
						sentSuccessfully
					}}
				/>
			)}
		</SafeAreaView>
	);
};

export default SendModal;
