import React from 'react';
import { useNavigation } from '@hooks';

export const useDepositScreen = () => {
	const navigation = useNavigation();
	const [notAbleToSaveVisible, setNotAbleToSaveVisible] = React.useState(true);

	const notAbleToSaveDismiss = () => {
		setNotAbleToSaveVisible(false);
		navigation.goBack();
	};

	const onAddFunds = () => {
		navigation.navigate('AddFundsScreen');
	};

	return {
		notAbleToSaveVisible,
		notAbleToSaveDismiss,
		onAddFunds
	};
};
