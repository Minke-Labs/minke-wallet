import React, { useCallback } from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions, useLanguage } from '@hooks';
import { PendingTransaction } from '@components';
import { FlatList } from 'react-native';
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
	const { loading, fetchTransactions, pendingTransactions } = useTransactions();

	console.log('\n\n\n\n');
	console.log('PendingTransaction HASH: ', pendingTransactions[0]);

	const handleRefresh = useCallback(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return (
		<TabLayout
			leftTitle={i18n.t('WalletScreen.Content.accounts')}
			rightTitle={i18n.t('WalletScreen.Content.transactions')}
			left={<Accounts />}
			right={
				<Transactions
					onAddFunds={() => setAddFundsVisible(true)}
					{...{ onSeeAllTransactions, loading }}
				/>
			}
			loading={loading}
			onRefresh={handleRefresh}
		>
			<Header
				onSettingsPress={onSettingsPress}
				onCopyPress={onCopyToClipboard}
			/>

			<FlatList
				style={{ paddingTop: 24, paddingBottom: 24 }}
				data={pendingTransactions}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<PendingTransaction
						address={item.destination}
						pending={item.pending}
						amount={item.amount}
						symbol={item.symbol}
						timestamp={item.timeStamp}
					/>
				)}
				keyExtractor={(item) => item.hash}
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
