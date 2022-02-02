import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './Modal.styles';
import Icon from '../Icon/Icon';

interface Props {
	onBackdropPress: () => void;
}

const ModalHeader: React.FC<Props> = ({ onBackdropPress }) => (
	<View style={styles.header}>
		<TouchableOpacity onPress={onBackdropPress} activeOpacity={0.8}>
			<Icon name="arrowBackStroke" size={24} color="primary" />
		</TouchableOpacity>
		<TouchableOpacity onPress={onBackdropPress} activeOpacity={0.8}>
			<Icon name="closeStroke" size={24} color="primary" />
		</TouchableOpacity>
	</View>
);

export default ModalHeader;
