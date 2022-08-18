import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Paper2, View, Icon, Modal, ModalBase, ModalReusables } from '@components';
import { useLanguage, useNavigation } from '@hooks';
import { spacing } from '@styles';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import Actions from './Actions/Actions';
import {
	SendModal,
	ReceiveModal
} from './Modals';

export const Selector: React.FC = () => {
	const { i18n } = useLanguage();
	const [actionsModal, setActionsModal] = useState(false);
	const [receiveModal, setReceiveModal] = useState(false);
	const [sentTransaction, setSentTransaction] = useState<ResultProps>();
	const [sendModal, setSendModal] = useState(false);
	const [error, setError] = useState(false);
	const [sendModalFinished, setSendModalFinished] = useState(false);

	const navigation = useNavigation();
	const { name: routeName } = useRoute();

	const onError = () => {
		setSendModalFinished(false);
		setError(true);
		setSendModal(true);
	};

	const onSendFinished = (obj: ResultProps) => {
		const { hash } = obj;
		setSendModalFinished(!hash);
		setSentTransaction(obj);
	};

	const handleSend = () => {
		setActionsModal(false);
		setSendModal(true);
	};

	const handleReceive = () => {
		setActionsModal(false);
		setReceiveModal(true);
	};

	return (
		<>
			<View
				cross="center"
				s={1}
				style={{
					position: 'absolute',
					width: '100%',
					bottom: spacing[6]
				}}
			>
				<Paper2
					w={196}
					h={52}
					br={6}
					ph={4}
					row
					main="space-between"
					cross="center"
				>
					<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
						<Icon
							name="home"
							size={28}
							color={routeName === 'HomeScreen' ? 'cta1' : 'cta2'}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setActionsModal(true)}>
						<Icon
							name="exchange"
							size={28}
							color="cta2"
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('MinkeHubScreen')}>
						<Icon
							name="hub"
							size={28}
							color={routeName === 'MinkeHubScreen' ? 'cta1' : 'cta2'}
						/>
					</TouchableOpacity>
				</Paper2>
			</View>

			<Modal isVisible={actionsModal} onDismiss={() => setActionsModal(false)}>
				<Actions
					onDismiss={() => setActionsModal(false)}
					onReceivePress={handleReceive}
					onSendPress={handleSend}
				/>
			</Modal>

			<ModalBase isVisible={sendModal} onDismiss={() => setSendModal(false)}>
				<SendModal
					onDismiss={() => setSendModal(false)}
					sentSuccessfully={(obj: ResultProps) => onSendFinished(obj)}
					isVisible={sendModal}
					onError={onError}
				/>
			</ModalBase>

			<ModalBase isVisible={receiveModal} onDismiss={() => setReceiveModal(false)}>
				<ReceiveModal onDismiss={() => setReceiveModal(false)} />
			</ModalBase>

			<ModalBase isVisible={sendModalFinished} onDismiss={() => setSendModalFinished(false)}>
				{sentTransaction && (
					<ModalReusables.TransactionWait
						transactionHash={sentTransaction.hash}
						fromToken={sentTransaction.token}
						onDismiss={() => setSendModalFinished(false)}
						sent
					/>
				)}
			</ModalBase>

			<ModalBase isVisible={error} onDismiss={() => setError(false)}>
				{error && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setError(false)}
						showHeader
					/>
				)}
			</ModalBase>
		</>
	);
};
