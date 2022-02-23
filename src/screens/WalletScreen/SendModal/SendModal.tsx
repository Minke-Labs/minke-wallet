/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ModalHeader } from '@components';
import { WalletToken } from '@src/model/wallet';
import TransactionContacts from './TransactionContacts/TransactionContacts';
import TransactionSelectFunds from './TransactionSelectFunds/TransactionSelectFunds';

const useFormProgress = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const goForward = () => setCurrentStep(currentStep + 1);
	const goBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);
	return [currentStep, setCurrentStep, goForward, goBack] as const;
};

interface SendModalProps {
	onDismiss: () => void;
}

interface UserProps {
	name: string;
	address: string;
}

const SendModal: React.FC<SendModalProps> = ({ onDismiss }) => {
	const [currentStep, setCurrentStep, goForward, goBack] = useFormProgress();
	const [user, setUser] = useState<UserProps>(null!);
	const [token, setToken] = useState<WalletToken>();

	return (
		<SafeAreaView>
			<ModalHeader onBack={goBack} onDismiss={onDismiss} />

			{currentStep === 0 && <TransactionSelectFunds user={user} onSelected={() => console.log('selec')} />}
			{currentStep === 1 && <View />}
			{currentStep === 2 && <View />}

		</SafeAreaView>
	);
};

export default SendModal;
