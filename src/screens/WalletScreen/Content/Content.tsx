import React, { useCallback, useEffect, useState } from 'react';
import { TabLayout } from '@layouts';
import { useNavigation, useTransactions, useLanguage } from '@hooks';
import { PendingTransaction } from '@components';
import { getProvider, ZapperTransaction, getENSAddress, smallWalletAddress } from '@src/model/wallet';
import crypto from 'crypto';
import { INTERCOM_KEY } from '@env';
import Intercom from '@intercom/intercom-react-native';
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
	const [ensName, setEnsName] = React.useState<string | null>('');
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { loading, fetchTransactions, pendingTransactions, updatePendingTransaction } = useTransactions();
	const [tx, setTx] = useState<ZapperTransaction | null>();

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

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};

		fetchENSAddress();
	}, []);

	const accountName = () => {
		if (ensName) {
			return ensName;
		}
		return smallWalletAddress(address);
	};

	const handleRefresh = useCallback(() => {
		fetchTransactions();
		setTx(null);
	}, [fetchTransactions]);

	// Register user on Intercom
	const intercomKey = INTERCOM_KEY || process.env.INTERCOM_KEY;
	const hmac = crypto.createHmac('sha256', intercomKey!);
	hmac.update(accountName());
	const sign = hmac.digest('hex');
	Intercom.setUserHash(sign);
	Intercom.registerIdentifiedUser({ userId: accountName() });
	//

	return (
		<TabLayout
			leftTitle={i18n.t('WalletScreen.Content.accounts')}
			rightTitle={i18n.t('WalletScreen.Content.transactions')}
			left={<Accounts />}
			right={<Transactions onAddFunds={() => setAddFundsVisible(true)} {...{ onSeeAllTransactions, loading }} />}
			loading={loading}
			onRefresh={handleRefresh}
		>
			<Header
				onSettingsPress={onSettingsPress}
				onCopyPress={onCopyToClipboard}
				accountName={accountName()}
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
		</TabLayout>
	);
};
