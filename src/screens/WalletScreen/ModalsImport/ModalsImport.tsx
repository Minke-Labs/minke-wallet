import React from 'react';
import { Snackbar } from 'react-native-paper';
import { Text, Modal } from '@components';
import { AddFunds } from '@containers';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import { useLanguage } from '@hooks';
import { SendModal, ReceiveModal } from '../Modals';
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
	sentTransaction,
	hideReceive,
	onSendFinished
}) => {
	const { i18n } = useLanguage();
	return (
		<>
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">{i18n.t('WalletScreen.ModalsImport.address_copied')}</Text>
			</Snackbar>

			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
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
				{sentTransaction && (
					<TransactionWaitModal
						transactionHash={sentTransaction.hash}
						fromToken={sentTransaction.token}
						onDismiss={() => setSendModalFinished(false)}
						sent
					/>
				)}
			</Modal>
		</>
	);
};

export default ModalsImport;
