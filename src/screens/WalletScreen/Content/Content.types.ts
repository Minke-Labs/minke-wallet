/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
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
	setAddFundsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSendModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onAvatarClick: (event: GestureResponderEvent) => void;
	balance: number;
}
