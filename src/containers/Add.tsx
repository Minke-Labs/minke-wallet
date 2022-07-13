import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { ModalHeader } from '@components';
import { useFormProgress } from '@hooks';
import { SelectorModal } from './SelectorModal/SelectorModal';

const Add = () => {
	const { currentStep, setCurrentStep } = useFormProgress();

	return (
		<SafeAreaView>
			<ModalHeader
				onBack={() => setCurrentStep(0)}
				onDismiss={() => null}
			/>
			<View style={{ paddingHorizontal: 16 }}>
				{currentStep === 0 && (
					<SelectorModal
						onBuy={() => setCurrentStep(1)}
						onExchange={() => setCurrentStep(2)}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Add;
