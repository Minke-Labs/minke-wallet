import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@hooks';
import { spacing } from '@styles';
import ModalBase from '@src/components/ModalBase/ModalBase';
import Modal from '@src/components/Modal/Modal';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Paper from '@src/components/Paper/Paper';
import Touchable from '@src/components/Touchable/Touchable';
import SendModalComponent from '@src/components/SendModalComponent/SendModalComponent';
import Actions from './Actions/Actions';
import { ReceiveModal } from './Modals';

const FloatingSelector: React.FC = () => {
	const [sendModal, setSendModal] = useState(false);
	const [actionsModal, setActionsModal] = useState(false);
	const [receiveModal, setReceiveModal] = useState(false);

	const navigation = useNavigation();
	const { name: routeName } = useRoute();

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
				w="100%"
				style={{
					position: 'absolute',
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

			<ModalBase isVisible={receiveModal} onDismiss={() => setReceiveModal(false)}>
				<ReceiveModal onDismiss={() => setReceiveModal(false)} />
			</ModalBase>

			<SendModalComponent {...{ sendModal, setSendModal }} />
		</>
	);
};

export default FloatingSelector;
