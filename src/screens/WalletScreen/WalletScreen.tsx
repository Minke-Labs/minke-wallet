import React from 'react';
import { Snackbar } from 'react-native-paper';
import { Text, Modal, ModalReusables } from '@components';
import { AddFunds } from '@containers';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { SendModal, ReceiveModal, AvatarModal } from './Modals';
import { useWalletScreen } from './WalletScreen.hooks';
import { ResultProps } from './WalletScreen.types';
import { Content } from './Content/Content';
import AppTour from './AppTour';

const WalletScreen = () => {
	RNUxcam.tagScreenName('WalletScreen');
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
		openAvatarModal,
		setOpenAvatarModal,
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
		<AppTour>
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
				onAvatarClick={() => setOpenAvatarModal(true)}
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
					<ModalReusables.TransactionWait
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
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setError(false)}
						showHeader
					/>
				)}
			</Modal>

			<Modal isVisible={openAvatarModal} onDismiss={() => setOpenAvatarModal(false)}>
				{openAvatarModal && (
					<AvatarModal onDismiss={() => setOpenAvatarModal(false)} />
				)}
			</Modal>
		</AppTour>
	);
};

export default WalletScreen;
