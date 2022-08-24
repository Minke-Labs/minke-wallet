import React from 'react';
import { useTokens } from '@hooks';
import { AccountsOverview } from './AccountsOverview/AccountsOverview';
import { AccountsEmpty } from './AccountsEmpty/AccountsEmpty';

export const Accounts = () => {
	const { balance } = useTokens();
	return balance > 0 ? <AccountsOverview /> : <AccountsEmpty />;
};
