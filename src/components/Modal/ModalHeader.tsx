import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './Modal.styles';
import Icon from '../Icon/Icon';

interface Props {
	onDismiss: () => void;
}

const ModalHeader: React.FC<Props> = ({ onDismiss }) => (
	<View style={styles.header}>
		<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
			<Icon name="arrowBackStroke" size={24} color="text7" />
		</TouchableOpacity>
		<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
			<Icon name="closeStroke" size={24} color="text7" />
		</TouchableOpacity>
	</View>
);

export default ModalHeader;
