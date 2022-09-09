import React from 'react';
import { useBalances } from '@hooks';
import { BlankStates, View } from '@components';
import { AccountsOverview } from './AccountsOverview/AccountsOverview';
import { AccountsEmpty } from './AccountsEmpty/AccountsEmpty';

export const Accounts = () => {
	const { balance, loading } = useBalances();

	if (loading) {
		return (
			<View mb="xs">
				<BlankStates.Type5 />
			</View>
		);
	}

	return balance > 0 ? <AccountsOverview /> : <AccountsEmpty />;
};
