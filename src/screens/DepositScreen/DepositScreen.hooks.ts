import { useState } from 'react';
import { useNavigation } from '@hooks';

export const useDepositScreen = () => {
	const navigation = useNavigation();
	const [notAbleToSaveVisible, setNotAbleToSaveVisible] = useState(true);
	const [addFundsVisible, setAddFundsVisible] = useState(false);

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
