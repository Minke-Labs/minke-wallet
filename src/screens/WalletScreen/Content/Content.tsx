import React from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions, useLanguage } from '@hooks';
import { PendingTransaction } from '@components';
import { AssetsPanel, ActionsPanel, Header } from '../components';
import { Transactions, Accounts } from '../screens';
import { ContentProps } from './Content.types';

export const Content: React.FC<ContentProps> = ({
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
}) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { loading, fetchTransactions } = useTransactions();

	return (
		<TabLayout
			leftTitle={i18n.t('WalletScreen.Content.accounts')}
			rightTitle={i18n.t('WalletScreen.Content.transactions')}
			left={<Accounts />}
			right={<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />}
			{...{ loading, fetchTransactions }}
		>
			<Header
				onSettingsPress={onSettingsPress}
				onCopyPress={onCopyToClipboard}
			/>

			<PendingTransaction
				address="To fridder.eth"
				amount="0.1"
				symbol="ETH"
				pending={false}
				minAgo={3}
			/>

			<AssetsPanel
				onSave={() => navigation.navigate('SaveScreen')}
				onWalletAssets={() => navigation.navigate('WalletAssetsScreen')}
				onAddFunds={() => setAddFundsVisible(true)}
				balance={balance?.usd || 0}
				address={address}
			/>

			<ActionsPanel
				{...{
					onDeleteWallet,
					onExchange,
					onSwitchAccounts,
					showReceive,
					onCopyToClipboard
				}}
				setSendModalOpen={() => setSendModalOpen(true)}
			/>
		</TabLayout>
	);
};
