import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
	Modal as ModalBase, // @@@ Rename the original modal into ModalBase.
	View, Icon
} from '@components';

interface ModalProps {
	isVisible: boolean;
	onDismiss: () => void;
	onBack?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onDismiss, onBack, children }) => (
	<ModalBase isVisible={isVisible} onDismiss={onDismiss}>
		<View p={3}>
			<View
				row
				main={onBack ? 'space-between' : 'flex-end'}
				mb={3}
			>
				{!!onBack && (
					<TouchableOpacity onPress={onBack}>
						<Icon size={24} name="chevronLeft" color="cta1" />
					</TouchableOpacity>
				)}
				<TouchableOpacity onPress={onDismiss}>
					<Icon size={24} name="close" color="cta1" />
				</TouchableOpacity>
			</View>
			{children}
		</View>
	</ModalBase>
);

export default Modal;
