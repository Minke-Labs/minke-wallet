import React from 'react';
import { TransactionsProvider } from '@contexts';
import { useWalletScreen } from './WalletScreen.hooks';
import ModalsImport from './ModalsImport/ModalsImport';
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
		sentObj,
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
		balance
	} = useWalletScreen();

	return (
		<TransactionsProvider>
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

			<ModalsImport
				{...{
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
				}}
			/>
		</TransactionsProvider>
	);
};

export default WalletScreen;
