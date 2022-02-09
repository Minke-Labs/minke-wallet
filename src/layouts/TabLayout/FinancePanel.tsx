import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@components';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24
	},
	financePanelContainer: {
		flex: 1,
		backgroundColor: '#fff'
	}
});

interface FinancePanelProps {
	selectedTab: string;
}

const FinancePanel: React.FC<FinancePanelProps> = ({ selectedTab }) => (
	<View
		style={[
			styles.financePanelContainer,
			{
				...(selectedTab === 'transactions' ? { borderTopRightRadius: 24 } : { borderTopLeftRadius: 24 })
			}
		]}
	>
		<Text>FINANCE</Text>
	</View>
);

export default FinancePanel;
