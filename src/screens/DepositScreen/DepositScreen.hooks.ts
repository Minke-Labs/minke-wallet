import React, { useEffect } from 'react';
import { approvalState, zapperApprovalState } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { useBiconomy, useDeposit, useNavigation } from '@hooks';
import { aaveDepositContract } from '@models/gaslessTransaction';
import { useState } from '@hookstate/core';

export const useDepositScreen = () => {
	const { gaslessEnabled } = useBiconomy();
	const navigation = useNavigation();
	const [approved, setApproved] = React.useState<boolean | undefined>(); // transaction amount is approved?
	const [notAbleToSaveVisible, setNotAbleToSaveVisible] = React.useState(true);
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const { market } = useState(globalDepositState()).value;
	const { tokens = [], address: marketAddress } = market || {};
	const { address } = globalWalletState().value;

	const { ableToDeposit } = useDeposit();

	useEffect(() => {
		const loadApproved = async () => {
			if (tokens[0]) {
				const { isApproved } = gaslessEnabled
					? await approvalState(address, tokens[0].address, aaveDepositContract)
					: await zapperApprovalState(address, tokens[0].address);
				setApproved(isApproved);
			}
		};
		loadApproved();
	}, [marketAddress]);

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
