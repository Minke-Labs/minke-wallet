import React from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions } from '@hooks';
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
	const navigation = useNavigation();
	const { loading, fetchTransactions } = useTransactions();

	return (
		<TabLayout
			leftTitle="Transactions"
			rightTitle="Accounts"
			left={<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />}
			right={<Accounts />}
			{...{
				loading,
				fetchTransactions
			}}
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
