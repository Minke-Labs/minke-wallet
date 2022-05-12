import React, { useEffect } from 'react';
import { approvalState, zapperApprovalState } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { useBiconomy, useDeposit, useDepositProtocols, useNavigation } from '@hooks';
import { aaveDepositContract } from '@models/gaslessTransaction';

export const useDepositScreen = () => {
	const { gaslessEnabled } = useBiconomy();
	const navigation = useNavigation();
	const [approved, setApproved] = React.useState<boolean | undefined>(); // transaction amount is approved?
	const [notAbleToSaveVisible, setNotAbleToSaveVisible] = React.useState(true);
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const { address } = globalWalletState().value;
	const { ableToDeposit } = useDeposit();
	const { depositableToken } = useDepositProtocols();

	useEffect(() => {
		const loadApproved = async () => {
			if (depositableToken) {
				const { isApproved } = gaslessEnabled
					? await approvalState(address, depositableToken.address, aaveDepositContract)
					: await zapperApprovalState(address, depositableToken.address);
				setApproved(isApproved);
			}
		};
		loadApproved();
	}, [depositableToken]);

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
