import { Modal } from 'react-native';
import React from 'react';
import { ModalBackground } from './ModalBackground/ModalBackground';
import ModalPaper from './ModalPaper/ModalPaper';
import { FullModalProps } from './FullModal.types';

const FullModal: React.FC<FullModalProps> = ({ children, visible, onClose }) => (
	<Modal
		transparent
		{...{ visible, onClose }}
	>
		<ModalBackground>
			<ModalPaper onPress={onClose}>
				{children}
			</ModalPaper>
		</ModalBackground>
	</Modal>
);

export default FullModal;
