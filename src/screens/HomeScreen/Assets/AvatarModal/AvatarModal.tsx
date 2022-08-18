import React from 'react';
import { AvatarModalProps } from './AvatarModal.types';
import { Chosen } from './Chosen';
import { Select } from './Select';

const AvatarModal: React.FC<AvatarModalProps> = ({ onSelectAvatar, onBack, currentStep }) => (
	<>
		{ currentStep === 0 && <Chosen {...{ onSelectAvatar }} /> }
		{ currentStep === 1 && <Select {...{ onBack }} /> }
	</>
);

export default AvatarModal;
