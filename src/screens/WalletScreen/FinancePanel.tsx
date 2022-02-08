import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import styles from './WalletScreen.styles';

const Body = () => (
	<View style={styles.body}>
		<Text>FINANCE</Text>
	</View>
);

const FinancePanel: React.FC = () => (
	<View style={styles.financePanelContainer}>
		<Body />
	</View>
);

export default FinancePanel;
