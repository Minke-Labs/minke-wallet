import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import styles from './WalletScreen.styles';

const screen = Dimensions.get('screen');

interface FinancePanelProps {
	height: number;
}

const FinancePanel: React.FC<FinancePanelProps> = ({ height }) => (
	<View style={[styles.financePanelContainer, { height: screen.height - height - 50 }]}>
		<View style={styles.tabContainer}>
			<TouchableOpacity activeOpacity={0.6} style={styles.tabLeft}>
				<Text>Transactions</Text>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.6} style={styles.tabRight}>
				<Text>Net worth</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.body}>
			<Text>FINANCE</Text>
		</View>
	</View>
);

export default FinancePanel;
