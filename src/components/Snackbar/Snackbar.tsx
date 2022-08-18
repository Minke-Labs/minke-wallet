import React from 'react';
import { Modal as RNModal } from 'react-native';
import { Snackbar as RNPSnackbar } from 'react-native-paper';
import Text from '../Text/Text';

interface SnackbarProps {
	title?: string;
	onDismiss: () => void;
	visible: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ title, onDismiss, visible }) => (
	<RNModal transparent visible={visible}>
		<RNPSnackbar duration={2000} onDismiss={onDismiss} visible={visible}>
			<Text color="text11">
				{title}
			</Text>
		</RNPSnackbar>
	</RNModal>
);

export default Snackbar;
