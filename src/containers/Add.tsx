import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { ModalHeader } from '@components';
import { useFormProgress } from '@hooks';
import { SelectorModal } from './SelectorModal/SelectorModal';
import { ExternalExchangeModal } from './ExternalExchangeModal/ExternalExchangeModal';

interface AddFundsProps {
	onDismiss: () => void;
	visible: boolean;
}

const AddFunds: React.FC<AddFundsProps> = ({ visible = false, onDismiss }) => {
	const { currentStep, setCurrentStep, reset } = useFormProgress();

	const dismissCoin = () => {
		reset();
		onDismiss();
	};

	useEffect(() => {
		if (!visible)reset();
	}, [visible]);

	return (
		<SafeAreaView>
			<ModalHeader
				onBack={() => setCurrentStep(0)}
				onDismiss={dismissCoin}
			/>
			<View style={{ paddingHorizontal: 16 }}>
				{currentStep === 0 && (
					<SelectorModal
						onBuy={() => setCurrentStep(1)}
						onExchange={() => setCurrentStep(10)}
					/>
				)}
				{currentStep === 10 && (
					<ExternalExchangeModal />
				)}
			</View>
		</SafeAreaView>
	);
};

export default AddFunds;
