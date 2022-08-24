import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { AccountBalance } from '@models/token';
import { getTokenBalances } from '@src/services/apis';

const useTokens = (): AccountBalance => {
	const { address } = useState(globalWalletState()).value;
	const [accountBalance, setAccountBalance] = React.useState<AccountBalance>();

	useEffect(() => {
		const loadTokens = async () => {
			const balance = await getTokenBalances(address);
			setAccountBalance(balance);
		};

		loadTokens();
	}, [address]);

	return accountBalance || ({} as AccountBalance);
};

export default useTokens;
