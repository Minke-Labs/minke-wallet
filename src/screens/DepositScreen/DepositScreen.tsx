import React, { useEffect } from 'react';
import { Modal, BlankStates } from '@components';
import { AddFunds } from '@containers';
import { useDepositProtocols, useTokens } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { MinkeToken } from '@models/token';
import Deposit from './Deposit/Deposit';
import OpenSavings from './OpenSavings/OpenSavings';
import NotAbleToSaveModal from './NotAbleToSaveModal/NotAbleToSaveModal';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen = () => {
	const { depositableTokens = [] } = useTokens();

	const {
		notAbleToSaveVisible,
		notAbleToSaveDismiss,
		addFundsVisible,
		dismissAddFunds, onAddFunds
	} = useDepositScreen();

	const {
		setSelectedUSDCoin,
		depositableToken,
		selectedProtocol,
		ableToDeposit,
		approved,
		setApproved,
		apy
	} = useDepositProtocols();
	RNUxcam.tagScreenName('DepositScreen');

	const [token, setToken] = React.useState<MinkeToken>();

	useEffect(() => {
		if (depositableToken && depositableTokens.length > 0) {
			const balanceToken = depositableTokens.find(
				({ symbol }) => symbol.toLowerCase() === depositableToken.symbol.toLowerCase()
			);
			setToken(balanceToken);
		}
	}, [depositableToken, depositableTokens]);

	if (ableToDeposit === undefined) return <BlankStates.Deposit />;

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

	if (approved === undefined) return <BlankStates.Deposit />;
	if (token === undefined) return <BlankStates.Deposit />;
	if (approved) {
		return (
			<Deposit
				{...{
					apy,
					setSelectedUSDCoin,
					depositableToken,
					selectedProtocol,
					token,
					setToken,
					depositableTokens
				}}
			/>
		);
	}

	return <OpenSavings onApprove={() => setApproved(true)} />;
};

export default DepositScreen;
