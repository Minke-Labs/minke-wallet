import React from 'react';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { getTransactions, Transaction as TransactionProps } from '@models/wallet';

export const useTransactionsScreen = () => {
	const [active, setActive] = React.useState(0);

	const wallet = useState(globalWalletState());
	const [page, setPage] = React.useState(1);
	const [refreshing, setRefreshing] = React.useState(false);
	const [loadedAll, setLoadedAll] = React.useState(false);
	const { transactions = [] } = wallet.value;

	const loadMoreTransactions = async () => {
		if (!loadedAll) {
			setRefreshing(true);
			setPage(page + 1);
			const result = await getTransactions(wallet.value.address || '', page + 1, 20);
			if (result.length > 0) {
				wallet.transactions.merge(result);
			} else {
				setLoadedAll(true);
			}
		}

		setRefreshing(false);
	};

	const address = wallet.address.value;

	const filteredTransactions = (txs: TransactionProps[]) => {
		if (active === 1) {
			return txs.filter((tx: any) => tx.to.toLowerCase() !== address.toLowerCase());
		}
		if (active === 2) {
			return txs.filter((tx: any) => tx.to.toLowerCase() === address.toLowerCase());
		}
		return txs;
	};

	return {
		transactions: filteredTransactions(transactions),
		active,
		setActive,
		loadMoreTransactions,
		refreshing
	};
};
