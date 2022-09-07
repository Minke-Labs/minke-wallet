import React from 'react';
import { useTokens } from '@hooks';
import { BlankStates, View } from '@components';
import { AccountsOverview } from './AccountsOverview/AccountsOverview';
import { AccountsEmpty } from './AccountsEmpty/AccountsEmpty';

export const Accounts = () => {
	const { accountBalance, loadingBalance } = useTokens();

	if (loadingBalance) {
		return (
			<View mb="xs">
				<BlankStates.Type4 h={287} />
			</View>
		);
	}

	return (accountBalance.balance > 0) ? <AccountsOverview /> : <AccountsEmpty />;
};
