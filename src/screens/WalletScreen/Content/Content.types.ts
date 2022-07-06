/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { BigNumber } from 'ethers';

export interface ContentProps {
	onDeleteWallet: () => void;
	onExchange: () => void;
	onSettingsPress: () => void;
	onPointsPress: () => void;
	onSwitchAccounts: () => void;
	onSeeAllTransactions: () => void;
	onCopyToClipboard: () => void;
	showReceive: () => void;
	address: string;
	balance:
		| {
				eth?: BigNumber | undefined;
				usd?: number | undefined;
				depositedBalance?: number | undefined;
				walletBalance?: number | undefined;
		  }
		| undefined;
	setAddFundsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSendModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
