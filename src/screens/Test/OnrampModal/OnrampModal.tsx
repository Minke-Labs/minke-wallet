import { Modal } from 'react-native';
import React from 'react';
import { ModalBackground } from './ModalBackground';
import ModalPaper from './ModalPaper';
import { OnrampModalProps } from './OnrampModal.types';

const OnrampModal: React.FC<OnrampModalProps> = ({ children, visible, onRequestClose }) => (
	<Modal
		transparent
		{...{ visible, onRequestClose }}
	>
		<ModalBackground>
			<ModalPaper>
				{children}
			</ModalPaper>
		</ModalBackground>
	</Modal>
);

export default OnrampModal;
