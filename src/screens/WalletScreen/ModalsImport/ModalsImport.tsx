import React from 'react';
import { Snackbar } from 'react-native-paper';
import { Text, Modal, ModalReusables } from '@components';
import { SendModal, ReceiveModal, SentModal } from '../Modals';
import { ResultProps } from '../WalletScreen.types';
import { ModalsImportProps } from './ModalsImport.types';

const ModalsImport: React.FC<ModalsImportProps> = ({
	sendModalOpen,
	setSendModalOpen,
	receiveVisible,
	addFundsVisible,
	setAddFundsVisible,
	snackbarVisible,
	setSnackbarVisible,
	sendModalFinished,
	setSendModalFinished,
	sentObj,
	hideReceive,
	onSendFinished
}) => (
	<>
		<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
			<Text color="text11">Address copied!</Text>
		</Snackbar>

		<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
			<ModalReusables.ComingSoon onDismiss={() => setAddFundsVisible(false)} />
		</Modal>

		<Modal isVisible={sendModalOpen} onDismiss={() => setSendModalOpen(false)}>
			<SendModal
				onDismiss={() => setSendModalOpen(false)}
				sentSuccessfully={(obj: ResultProps) => onSendFinished(obj)}
				isVisible={sendModalOpen}
			/>
		</Modal>

		<Modal isVisible={receiveVisible} onDismiss={hideReceive}>
			<ReceiveModal onDismiss={hideReceive} />
		</Modal>

		<Modal isVisible={sendModalFinished} onDismiss={() => setSendModalFinished(false)}>
			<SentModal sentObj={sentObj} onDismiss={() => setSendModalFinished(false)} />
		</Modal>
	</>
);

export default ModalsImport;
