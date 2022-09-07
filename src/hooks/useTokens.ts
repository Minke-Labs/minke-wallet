import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { AccountBalance } from '@models/token';
import { getTokenBalances } from '@src/services/apis';

const useTokens = () => {
	const { address } = useState(globalWalletState()).value;
	const [loadingBalance, setLoadingBalance] = React.useState(false);
	const [accountBalance, setAccountBalance] = React.useState<AccountBalance>({} as AccountBalance);

	useEffect(() => {
		const loadTokens = async () => {
			setLoadingBalance(true);
			const balance = await getTokenBalances(address);
			setAccountBalance(balance);
			setLoadingBalance(false);
		};

		loadTokens();
	}, [address]);

	return {
		accountBalance,
		loadingBalance
	};
};

export default useTokens;
