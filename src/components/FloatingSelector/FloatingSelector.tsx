import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useLanguage, useNavigation } from '@hooks';
import { spacing } from '@styles';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import ModalReusables from '@src/components/ModalReusables';
import ModalBase from '@src/components/ModalBase/ModalBase';
import Modal from '@src/components/Modal/Modal';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Paper from '@src/components/Paper/Paper';
import Touchable from '@src/components/Touchable/Touchable';
import Actions from './Actions/Actions';
import { ReceiveModal } from './Modals';

const FloatingSelector: React.FC = () => {
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
					bottom: spacing.l
				}}
			>
				<Paper
					w={196}
					h={52}
					br="l"
					ph="s"
					row
					main="space-between"
					cross="center"
				>
					<Touchable onPress={() => navigation.navigate('HomeScreen')}>
						<Icon
							name="home"
							size={28}
							color={routeName === 'HomeScreen' ? 'cta1' : 'cta2'}
						/>
					</Touchable>
					<Touchable onPress={() => setActionsModal(true)}>
						<Icon
							name="exchange"
							size={28}
							color="cta2"
						/>
					</Touchable>
					<Touchable onPress={() => navigation.navigate('MinkeHubScreen')}>
						<Icon
							name="hub"
							size={28}
							color={routeName === 'MinkeHubScreen' ? 'cta1' : 'cta2'}
						/>
					</Touchable>
				</Paper>
			</View>

			<Modal isVisible={actionsModal} onDismiss={() => setActionsModal(false)}>
				<Actions
					onDismiss={() => setActionsModal(false)}
					onReceivePress={handleReceive}
					onSendPress={handleSend}
				/>
			</Modal>

			<ModalBase isVisible={sendModal} onDismiss={() => setSendModal(false)}>
				<ModalReusables.Send
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

export default FloatingSelector;
