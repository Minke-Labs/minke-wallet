import React, { useCallback, useEffect, useState } from 'react';
import { TabLayout } from '@layouts';
import { useTransactions, useLanguage } from '@hooks';
import { PendingTransaction, Text, View } from '@components';
import { getProvider, ZapperTransaction } from '@src/model/wallet';
import { ContentProps } from './Content.types';

export const Content: React.FC<ContentProps> = () => {
	const { i18n } = useLanguage();
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

	// @@@TODO: Keep the system on the new design, including the refresh to reload transactions.
	const handleRefresh = useCallback(() => {
		fetchTransactions();
		setTx(null);
	}, [fetchTransactions]);

	return (
		<TabLayout
			leftTitle={i18n.t('WalletScreen.Content.accounts')}
			rightTitle={i18n.t('WalletScreen.Content.transactions')}
			left={<Text>acounts</Text>}
			right={<Text>transactions</Text>}
			loading={loading}
			onRefresh={handleRefresh}
		>
			{!!tx && <PendingTransaction transaction={tx} />}

			<View h={150} />

		</TabLayout>
	);
};
