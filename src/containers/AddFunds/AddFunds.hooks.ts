import { useEffect } from 'react';
import { useAmplitude, useFormProgress, useNavigation } from '@hooks';

interface UseAddFundsProps {
	onDismiss: () => void;
	visible: boolean;
}

export const useAddFunds = ({ visible, onDismiss }: UseAddFundsProps) => {
	const { currentStep, reset, setCurrentStep } = useFormProgress();
	const navigation = useNavigation();
	const { track } = useAmplitude();

	const onBuy = () => {
		onDismiss();
		navigation.navigate('AddFundsScreen', {});
	};

	useEffect(() => {
		if (!visible) {
			reset();
		} else {
			track('Add Funds Modal Opened');
		}
	}, [visible]);

	return {
		currentStep,
		setCurrentStep,
		onBuy
	};
};
