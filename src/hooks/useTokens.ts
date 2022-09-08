import { useState, useEffect } from 'react';
import { AccountBalance } from '@models/token';
import { getTokenBalances } from '@src/services/apis';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

const useTokens = () => {
	const { address } = useGlobalWalletState();
	const [loadingBalance, setLoadingBalance] = useState(false);
	const [accountBalance, setAccountBalance] = useState<AccountBalance>({} as AccountBalance);

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
