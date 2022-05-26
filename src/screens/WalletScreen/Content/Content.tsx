import React, { useCallback, useEffect, useState } from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions, useLanguage } from '@hooks';
import { PendingTransaction } from '@components';
import { getProvider, ZapperTransaction } from '@src/model/wallet';
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
	const [txs, setTxs] = useState<ZapperTransaction[]>([]);
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { loading, fetchTransactions, pendingTransactions, setPendingTransactions } = useTransactions();

	useEffect(() => {
		const fetchStatus = async () => {
			const res = pendingTransactions.map(async (tx: ZapperTransaction) => {
				const provider = await getProvider();
				await provider.waitForTransaction(tx.hash);
				return { ...tx, pending: false, txSuccessful: true };
			});
			setTxs(await Promise.all(res));
		};

		fetchStatus();
	}, [pendingTransactions]);

	const handleRefresh = useCallback(() => {
		fetchTransactions();
		setPendingTransactions([]);
		setTxs([]);
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

			{
				txs.map((tx: ZapperTransaction) => (
					<PendingTransaction
						key={tx.hash}
						address={tx.destination}
						pending={tx.pending}
						amount={tx.amount}
						symbol={tx.symbol}
						timestamp={tx.timeStamp}
					/>
				))
			}

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
