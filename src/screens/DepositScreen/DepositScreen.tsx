import React from 'react';
import { ModalBase, BlankStates } from '@components';
import { useDepositProtocols } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { AddFunds } from '@containers';
import Deposit from './Deposit/Deposit';
import OpenSavings from './OpenSavings/OpenSavings';
import NotAbleToSaveModal from './NotAbleToSaveModal/NotAbleToSaveModal';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen = () => {
	const { notAbleToSaveVisible, notAbleToSaveDismiss, dismissAddFunds, addFundsVisible, onAddFunds } =
		useDepositScreen();
	const { setSelectedUSDCoin, depositableToken, selectedProtocol, ableToDeposit, approved, setApproved, apy } =
		useDepositProtocols();
	RNUxcam.tagScreenName('DepositScreen');

	if (ableToDeposit === undefined) return <BlankStates.Deposit />;

	if (!ableToDeposit) {
		return (
			<>
				<ModalBase isVisible={notAbleToSaveVisible} onDismiss={notAbleToSaveDismiss}>
					<NotAbleToSaveModal
						visible={notAbleToSaveVisible}
						onDismiss={notAbleToSaveDismiss}
						onAddFunds={onAddFunds}
					/>
				</ModalBase>
				<ModalBase isVisible={addFundsVisible} onDismiss={dismissAddFunds}>
					<AddFunds visible={addFundsVisible} onDismiss={dismissAddFunds} />
				</ModalBase>
			</>
		);
	}

	if (approved === undefined) return <BlankStates.Deposit />;

	if (approved) return <Deposit {...{ apy, setSelectedUSDCoin, depositableToken, selectedProtocol }} />;
	return <OpenSavings onApprove={() => setApproved(true)} />;
};

export default DepositScreen;
