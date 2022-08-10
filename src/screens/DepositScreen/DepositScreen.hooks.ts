import React from 'react';
import { useNavigation } from '@hooks';

export const useDepositScreen = () => {
	const navigation = useNavigation();
	const [notAbleToSaveVisible, setNotAbleToSaveVisible] = React.useState(true);
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);

	const notAbleToSaveDismiss = () => {
		setNotAbleToSaveVisible(false);
		navigation.goBack();
	};

	const onAddFunds = () => {
		setAddFundsVisible(true);
	};

	const dismissAddFunds = () => {
		setAddFundsVisible(false);
		navigation.goBack();
	};

	return {
		notAbleToSaveVisible,
		notAbleToSaveDismiss,
		dismissAddFunds,
		addFundsVisible,
		onAddFunds
	};
};
