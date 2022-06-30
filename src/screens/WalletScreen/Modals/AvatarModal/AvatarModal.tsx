import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text, ModalHeader } from '@components';
import styles from './AvatarModal.styles';

interface AvatarModalProps {
	onDismiss: () => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ onDismiss }) => (
	<SafeAreaView>
		<ModalHeader {...{ onDismiss }} />
		<View style={styles.container}>
			<Text>AvatarModal</Text>
		</View>
	</SafeAreaView>
);

export default AvatarModal;
