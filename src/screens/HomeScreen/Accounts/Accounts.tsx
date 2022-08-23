import React, { useState } from 'react';
import { ModalBase } from '@components';
import { AddFunds } from '@containers';
import { AccountsEmpty } from './AccountsEmpty/AccountsEmpty';

export const Accounts = () => {
	const [addFundsVisible, setAddFundsVisible] = useState(false);

	return (
		<>
			<AccountsEmpty {...{ setAddFundsVisible }} />
			<ModalBase isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</ModalBase>
		</>
	);
};
