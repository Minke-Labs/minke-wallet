import React from 'react';
import { AvatarModalProps } from './AvatarModal.types';
import { Main } from './Main/Main';
import { Select } from './Select';

const AvatarModal: React.FC<AvatarModalProps> = ({ onSelectAvatar, onBack, currentStep }) => (
	<>
		{ currentStep === 0 && <Main {...{ onSelectAvatar }} /> }
		{ currentStep === 1 && <Select {...{ onBack }} /> }
	</>
);

export default AvatarModal;
