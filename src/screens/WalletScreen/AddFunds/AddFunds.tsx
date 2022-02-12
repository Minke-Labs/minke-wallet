/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createRef, useState } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import { ICoin, coins } from '@helpers/coins';
import { ModalHeader } from '@components';
import CoinSelectorModal from './CoinSelectorModal';
import ChooseQuantityModal from './ChooseQuantityModal';
import CustomAmountModal from './CustomAmountModal';

const useFormProgress = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const goForward = () => setCurrentStep(currentStep + 1);
	const goBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);
	return [currentStep, setCurrentStep, goForward, goBack] as const;
};

interface AddFundsModalProps {
	onDismiss: () => void;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ onDismiss }) => {
	const [currentStep, setCurrentStep, goForward, goBack] = useFormProgress();
	const [coin, setCoin] = useState<ICoin>(coins.ethereum);
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = useState<number | null>(null);
	const customAmountRef = createRef<TextInput>();

	const selectCoin = (selectedCoin: ICoin) => {
		setCoin(selectedCoin);
		goForward();
	};

	const setPresetAmount = (value: number) => {
		setAmount(value);
		setCustomAmount(null);
	};

	const enableCustomAmount = () => {
		setAmount(undefined);
		customAmountRef.current?.focus();
		goForward();
	};

	const dismissCoin = () => {
		onDismiss();
		setCurrentStep(0);
	};

	return (
		<SafeAreaView>
			<ModalHeader onBack={goBack} onDismiss={dismissCoin} />
			<View style={{ paddingHorizontal: 24 }}>
				{currentStep === 0 && <CoinSelectorModal onSelect={selectCoin} />}
				{currentStep === 1 && (
					<ChooseQuantityModal
						coin={coin}
						amount={amount}
						setPresetAmount={setPresetAmount}
						enableCustomAmount={enableCustomAmount}
					/>
				)}
				{currentStep === 2 && (
					<CustomAmountModal
						customAmount={customAmount}
						setCustomAmount={setCustomAmount}
						customAmountRef={customAmountRef}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default AddFundsModal;
