import React, { useEffect } from 'react';
import { approvalState } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { Modal, ScreenLoadingIndicator, ModalReusables } from '@components';
import { useDeposit, useNavigation } from '@hooks';
import Deposit from './Deposit/Deposit';
import OpenAave from './OpenAave/OpenAave';
import { NotAbleToSaveModal } from '../WalletScreen/Modals';

const DepositScreen = () => {
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
				const { isApproved } = await approvalState(address, tokens[0].address);
				setApproved(isApproved);
			}
		};
		loadApproved();
	}, []);

	if (ableToDeposit === undefined || approved === undefined) {
		return <ScreenLoadingIndicator />;
	}

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
					<ModalReusables.ComingSoon onDismiss={dismissAddFunds} />
				</Modal>
			</>
		);
	}
	if (approved) return <Deposit />;
	return <OpenAave onApprove={() => setApproved(true)} />;
};

export default DepositScreen;
