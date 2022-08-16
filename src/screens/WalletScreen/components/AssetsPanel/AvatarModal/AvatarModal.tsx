import React from 'react';
import { SafeAreaView } from 'react-native';
import { useFormProgress } from '@hooks';
import { AvatarModalProps } from './AvatarModal.types';
import { Chosen } from './Chosen';
import { Select } from './Select';

const AvatarModal: React.FC<AvatarModalProps> = ({ onDismiss }) => {
	const { currentStep, goForward, goBack } = useFormProgress();

	return (
		<SafeAreaView>
			{ currentStep === 0 && <Chosen onDismiss={onDismiss} onSelectAvatar={() => goForward()} /> }
			{ currentStep === 1 && <Select onDismiss={onDismiss} onBack={() => goBack()} /> }
		</SafeAreaView>
	);
};

export default AvatarModal;
