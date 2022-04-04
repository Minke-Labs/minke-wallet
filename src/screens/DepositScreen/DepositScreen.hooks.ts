import React, { useEffect } from 'react';
import { approvalState } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { useDeposit, useNavigation } from '@hooks';
import { aaveDepositContract } from '@models/gaslessTransaction';

export const useDepositScreen = () => {
	const navigation = useNavigation();
	const [approved, setApproved] = React.useState<boolean | undefined>(); // transaction amount is approved?
	const [notAbleToSaveVisible, setNotAbleToSaveVisible] = React.useState(true);
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const {
		market: { tokens = [] }
	} = globalDepositState().value;
	const { address } = globalWalletState().value;

	const { ableToDeposit } = useDeposit();

	useEffect(() => {
		const loadApproved = async () => {
			if (tokens[0]) {
				const { isApproved } = await approvalState(address, tokens[0].address, aaveDepositContract);
				setApproved(isApproved);
			}
		};
		loadApproved();
	}, []);

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
		addFundsVisible,
		dismissAddFunds,
		onAddFunds,
		ableToDeposit,
		approved,
		setApproved
	};
};
