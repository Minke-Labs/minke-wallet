import { View } from 'react-native';
import React from 'react';
import styles from './ModalBackground.styles';

export const ModalBackground: React.FC = ({ children }) => (
	<View style={styles.container}>
		{children}
	</View>
);
