import React from 'react';

import { BlankStates, View } from '@components';
import { useBalances } from '@hooks';

import { AccountsOverview } from './AccountsOverview/AccountsOverview';

export const Accounts = () => {
	const { balance, loading } = useBalances();

	if (loading) {
		return (
			<View mb="xs">
				<BlankStates.Type5 />
			</View>
		);
	}

	return balance > 0 ? <AccountsOverview /> : <></>;
};
