/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { BigNumber } from 'ethers';
import { GestureResponderEvent } from 'react-native';

export interface ContentProps {
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
	setSendModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onAvatarClick: (event: GestureResponderEvent) => void;
}
