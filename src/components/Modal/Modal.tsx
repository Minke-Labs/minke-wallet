import React from 'react';
import ModalBase from '../ModalBase/ModalBase';
import View from '../View/View';
import Icon from '../Icon/Icon';
import Touchable from '../Touchable/Touchable';

interface ModalProps {
	isVisible: boolean;
	onDismiss: () => void;
	onBack?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onDismiss, onBack, children }) => (
	<ModalBase isVisible={isVisible} onDismiss={onDismiss}>
		<View p="xs">
			<View
				row
				main={onBack ? 'space-between' : 'flex-end'}
				mb="xs"
			>
				{!!onBack && (
					<Touchable onPress={onBack}>
						<Icon size={24} name="chevronLeft" color="cta1" />
					</Touchable>
				)}
				<Touchable onPress={onDismiss}>
					<Icon size={24} name="close" color="cta1" />
				</Touchable>
			</View>
			{children}
		</View>
	</ModalBase>
);

export default Modal;
