import React, { useCallback, useEffect, useState } from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions, useLanguage } from '@hooks';
import { PendingTransaction } from '@components';
import { getProvider } from '@src/model/wallet';
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
	const [mined, setMined] = useState(false);
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { loading, fetchTransactions, pendingTransactions, setPendingTransactions } = useTransactions();

	useEffect(() => {
		const fetchStatus = async () => {
			if (pendingTransactions[0]?.hash) {
				const provider = await getProvider();
				await provider.waitForTransaction(pendingTransactions[0]?.hash);
				setMined(true);
			} else {
				setMined(false);
			}
		};

		fetchStatus();
	}, [pendingTransactions[0]?.hash]);

	const handleRefresh = useCallback(() => {
		fetchTransactions();
		if (mined) setPendingTransactions([]);
	}, [fetchTransactions]);

	console.log('\n\n\n\n')
	console.log('pendingTransactions', pendingTransactions);

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
				pendingTransactions.length > 0 && (
					<PendingTransaction
						key={pendingTransactions[0].hash}
						address={pendingTransactions[0].destination}
						pending={!mined}
						amount={pendingTransactions[0].amount}
						symbol={pendingTransactions[0].symbol}
						timestamp={pendingTransactions[0].timeStamp}
					/>
				)
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
