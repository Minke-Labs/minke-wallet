import React from 'react';
import { ResultProps } from '../WalletScreen.types';

export interface ModalsImportProps {
	sendModalOpen: boolean;
	setSendModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	receiveVisible: boolean;
	addFundsVisible: boolean;
	setAddFundsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	snackbarVisible: boolean;
	setSnackbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
	sendModalFinished: boolean;
	setSendModalFinished: React.Dispatch<React.SetStateAction<boolean>>;
	sentObj: ResultProps | undefined;
	hideReceive: () => void;
	onSendFinished: (obj: ResultProps) => void;
}
