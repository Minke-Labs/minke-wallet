import React from 'react';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { ZapperTransaction } from '@models/wallet';

export const useTransactionsScreen = () => {
	const [active, setActive] = React.useState(0);

	const wallet = useState(globalWalletState());
	const { transactions = [] } = wallet.value;

	const filteredTransactions = (txs: ZapperTransaction[]) => {
		if (active === 1) {
			return txs.filter((tx: ZapperTransaction) => tx.direction === 'outgoing');
		}
		if (active === 2) {
			return txs.filter((tx: ZapperTransaction) => tx.direction === 'incoming');
		}
		return txs;
	};

	return {
		transactions: filteredTransactions(transactions),
		active,
		setActive
	};
};
