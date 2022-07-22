import React from 'react';
import { Modal, BlankStates } from '@components';
import { AddFunds } from '@containers';
import { useDepositProtocols } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import Deposit from './Deposit/Deposit';
import OpenSavings from './OpenSavings/OpenSavings';
import NotAbleToSaveModal from './NotAbleToSaveModal/NotAbleToSaveModal';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen = () => {
	const { notAbleToSaveVisible, notAbleToSaveDismiss, addFundsVisible, dismissAddFunds, onAddFunds } =
		useDepositScreen();
	const { ableToDeposit, approved, setApproved } = useDepositProtocols();
	RNUxcam.tagScreenName('DepositScreen');

	if (ableToDeposit === undefined) {
		return <BlankStates.Deposit />;
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
		return <BlankStates.Deposit />;
	}

	if (approved) return <Deposit />;
	return <OpenSavings onApprove={() => setApproved(true)} />;
};

export default DepositScreen;
