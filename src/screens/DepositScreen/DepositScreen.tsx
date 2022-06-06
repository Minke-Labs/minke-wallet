import React from 'react';
import { Modal, ScreenLoadingIndicator } from '@components';
import { AddFunds } from '@containers';
import { useDepositProtocols } from '@hooks';
import Deposit from './Deposit/Deposit';
import OpenSavings from './OpenSavings/OpenSavings';
import NotAbleToSaveModal from './NotAbleToSaveModal/NotAbleToSaveModal';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen = () => {
	const { notAbleToSaveVisible, notAbleToSaveDismiss, addFundsVisible, dismissAddFunds, onAddFunds } =
		useDepositScreen();
	const { ableToDeposit, approved, setApproved } = useDepositProtocols();

	if (ableToDeposit === undefined) {
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

	if (approved === undefined) {
		return <ScreenLoadingIndicator />;
	}

	if (approved) return <Deposit />;
	return <OpenSavings onApprove={() => setApproved(true)} />;
};

export default DepositScreen;
