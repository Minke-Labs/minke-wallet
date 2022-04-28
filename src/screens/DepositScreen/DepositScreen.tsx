import React from 'react';
import { Modal, ScreenLoadingIndicator } from '@components';
import { AddFunds } from '@containers';
import Deposit from './Deposit/Deposit';
import OpenAave from './OpenAave/OpenAave';
import NotAbleToSaveModal from './NotAbleToSaveModal/NotAbleToSaveModal';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen = () => {
	const {
		notAbleToSaveVisible,
		notAbleToSaveDismiss,
		addFundsVisible,
		dismissAddFunds,
		onAddFunds,
		ableToDeposit,
		approved,
		setApproved
	} = useDepositScreen();

	if (ableToDeposit === undefined || approved === undefined) {
		return <ScreenLoadingIndicator />;
	}

	if (!ableToDeposit) {
		return (
			<>
				<Modal isVisible={notAbleToSaveVisible} onDismiss={notAbleToSaveDismiss}>
					<NotAbleToSaveModal
						visible={notAbleToSaveVisible}
						onDismiss={notAbleToSaveDismiss}
						onAddFunds={onAddFunds}
					/>
				</Modal>
				<Modal isVisible={addFundsVisible} onDismiss={dismissAddFunds}>
					<AddFunds visible={addFundsVisible} onDismiss={dismissAddFunds} />
				</Modal>
			</>
		);
	}
	if (approved) return <Deposit />;
	return <OpenAave onApprove={() => setApproved(true)} />;
};

export default DepositScreen;
