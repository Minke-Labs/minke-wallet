import React from 'react';
import { Snackbar } from 'react-native-paper';
import { Text, Modal, ModalReusables } from '@components';
import { AddFunds } from '@containers';
import { useLanguage } from '@hooks';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import { SendModal, ReceiveModal } from './Modals';
import { useWalletScreen } from './WalletScreen.hooks';
import { ResultProps } from './WalletScreen.types';
import { Content } from './Content/Content';

const WalletScreen = () => {
	const {
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
		onDeleteWallet,
		onExchange,
		onSettingsPress,
		onSwitchAccounts,
		onSeeAllTransactions,
		hideReceive,
		showReceive,
		onCopyToClipboard,
		onSendFinished,
		address,
		balance,
		onError,
		setError,
		error
	} = useWalletScreen();
	const { i18n } = useLanguage();

	return (
		<>
			<Content
				{...{
					onDeleteWallet,
					onExchange,
					onSettingsPress,
					onSwitchAccounts,
					onSeeAllTransactions,
					onCopyToClipboard,
					showReceive,
					address,
					balance,
					setAddFundsVisible,
					setSendModalOpen
				}}
			/>

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
					onError={onError}
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

			<Modal isVisible={error} onDismiss={() => setError(false)}>
				{error && (
					<ModalReusables.Error
						title={i18n.t('Components.ModalReusables.Error.Blockchain.title')}
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setError(false)}
						showHeader
						buttonLabel={i18n.t('Components.ModalReusables.Error.Blockchain.button')}
					/>
				)}
			</Modal>
		</>
	);
};

export default WalletScreen;
