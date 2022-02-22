import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../Modal/Modal.styles';
import Icon from '../Icon/Icon';

interface ModalHeaderProps {
	onBack?: () => void;
	onDismiss: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onBack, onDismiss }) => (
	<View style={styles.header}>
		{onBack ? (
			<TouchableOpacity onPress={onBack} activeOpacity={0.8}>
				<Icon name="arrowBackStroke" size={24} color="text7" />
			</TouchableOpacity>
		) : <View />}

		<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
			<Icon name="closeStroke" size={24} color="text7" />
		</TouchableOpacity>
	</View>
);

export default ModalHeader;
