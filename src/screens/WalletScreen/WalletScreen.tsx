import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { TabLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { AssetsPanel, ActionsPanel, Header } from './components';
import { Transactions, Accounts } from './screens';
import { useWalletScreen } from './WalletScreen.hooks';
import ModalsImport from './ModalsImport/ModalsImport';

const WalletScreen = () => {
	const navigation = useNavigation();

	const {
		loading,
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
		onCreateWallet,
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
		fetchTransactions
	} = useWalletScreen();

	return (
		<>
			<TabLayout
				leftTitle="Transactions"
				rightTitle="Accounts"
				left={
					<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />
				}
				right={<Accounts />}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} />}
				>
					<Header onSettingsPress={onSettingsPress} />
					<AssetsPanel
						onSave={() => navigation.navigate('SaveScreen')}
						onWalletAssets={() => navigation.navigate('WalletAssetsScreen')}
						onAddFunds={() => setAddFundsVisible(true)}
						balance={balance?.usd || 0}
						address={address}
					/>
					<ActionsPanel
						{...{
							onCreateWallet,
							onDeleteWallet,
							onExchange,
							onSwitchAccounts,
							showReceive,
							onCopyToClipboard
						}}
						setSendModalOpen={() => setSendModalOpen(true)}
					/>
				</ScrollView>
			</TabLayout>

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
		</>
	);
};

export default WalletScreen;
