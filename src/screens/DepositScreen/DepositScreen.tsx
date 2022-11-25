import React from 'react';
import { ModalBase, BlankStates } from '@components';
import { useDepositProtocols, useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { AddFunds } from '@containers';
import Deposit from './Deposit/Deposit';
import OpenSavings from './OpenSavings/OpenSavings';
import NotAbleToSaveModal from './NotAbleToSaveModal/NotAbleToSaveModal';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen = () => {
	RNUxcam.tagScreenName('DepositScreen');
	// const { i18n } = useLanguage();

	// const { notAbleToSaveVisible, notAbleToSaveDismiss, dismissAddFunds, addFundsVisible, onAddFunds } =
	// 	useDepositScreen();

	// if (ableToDeposit === undefined) {
	// 	return <BlankStates.Type1 title={i18n.t('Components.BlankStates.Deposit')} />;
	// }

	// if (!ableToDeposit) {
	// 	return (
	// 		<>
	// 			<ModalBase isVisible={notAbleToSaveVisible} onDismiss={notAbleToSaveDismiss}>
	// 				<NotAbleToSaveModal
	// 					visible={notAbleToSaveVisible}
	// 					onDismiss={notAbleToSaveDismiss}
	// 					onAddFunds={onAddFunds}
	// 				/>
	// 			</ModalBase>
	// 			<ModalBase isVisible={addFundsVisible} onDismiss={dismissAddFunds}>
	// 				<AddFunds visible={addFundsVisible} onDismiss={dismissAddFunds} />
	// 			</ModalBase>
	// 		</>
	// 	);
	// }

	return <Deposit />;
};

export default DepositScreen;
