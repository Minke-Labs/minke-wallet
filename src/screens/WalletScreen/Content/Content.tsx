import React, { useCallback, useEffect, useState } from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions, useLanguage, useMinkeRewards } from '@hooks';
import { PendingTransaction } from '@components';
import { getProvider, ZapperTransaction } from '@src/model/wallet';
import { AssetsPanel, ActionsPanel, Header, Stories } from '../components';
import { Transactions, Accounts } from '../screens';
import { ContentProps } from './Content.types';

export const Content: React.FC<ContentProps> = ({
	onDeleteWallet,
	onExchange,
	onSettingsPress,
	onPointsPress,
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
	const { loading, fetchTransactions, pendingTransactions, updatePendingTransaction } = useTransactions();
	const [tx, setTx] = useState<ZapperTransaction | null>();
	const { points } = useMinkeRewards();

	useEffect(() => {
		const fetchStatus = async () => {
			const provider = await getProvider();
			const pending = pendingTransactions.filter((t) => t.pending)[0];
			if (pending) {
				setTx(pending);
				const { status } = await provider.waitForTransaction(pending.hash);
				const newTransaction = { ...pending, pending: false, txSuccessful: status === 1 };
				setTx(newTransaction);
				updatePendingTransaction(pending.hash, newTransaction);
			}
		};

		fetchStatus();
	}, [pendingTransactions]);

	const handleRefresh = useCallback(() => {
		fetchTransactions();
		setTx(null);
	}, [fetchTransactions]);

	return (
		<TabLayout
			leftTitle={i18n.t('WalletScreen.Content.accounts')}
			rightTitle={i18n.t('WalletScreen.Content.transactions')}
			left={<Accounts points={points} />}
			right={<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />}
			loading={loading}
			onRefresh={handleRefresh}
		>
			<Header
				onPointsPress={onPointsPress}
				onSettingsPress={onSettingsPress}
				onCopyPress={onCopyToClipboard}
				points={points}
			/>

			{!!tx && <PendingTransaction transaction={tx} />}

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

			<Stories />
		</TabLayout>
	);
};
