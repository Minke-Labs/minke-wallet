import React from 'react';
import { ModalHeader, View } from '@components';
import { useAddFunds } from './AddFunds.hooks';
import { AddFundsProps } from './AddFunds.types';
import { SelectorModal } from '../SelectorModal/SelectorModal';
import { ExternalExchangeModal } from './ExternalExchangeModal/ExternalExchangeModal';

const AddFunds: React.FC<AddFundsProps> = ({ visible = false, onDismiss }) => {
	const { currentStep, setCurrentStep, onBuy } = useAddFunds({ visible, onDismiss });

	const handleReturn = () => {
		if (currentStep === 0) {
			onDismiss();
		} else {
			setCurrentStep(0);
		}
	};

	return (
		<>
			<ModalHeader onBack={currentStep === 1 ? handleReturn : undefined} onDismiss={onDismiss} />
			<View ph="s" pb="s">
				<>
					{currentStep === 0 && <SelectorModal onBuy={onBuy} onExchange={() => setCurrentStep(1)} />}
					{currentStep === 1 && <ExternalExchangeModal />}
				</>
			</View>
		</>
	);
};

export default AddFunds;
