import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@components';
import Tab from './Tab';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	tabContainer: {
		height: 51,
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		width: screenWidth
	}
});

interface TabSelectorProps {
	setSelectedTab: Dispatch<SetStateAction<string>>;
	selectedTab: string;
}

const TabSelector: React.FC<TabSelectorProps> = ({ setSelectedTab, selectedTab }) => (
	<View style={styles.tabContainer}>
		<Tab side="left" active={selectedTab === 'transactions' && true} onTabSelect={setSelectedTab}>
			<Text weight={selectedTab === 'transactions' ? 'bold' : 'medium'}>Transactions</Text>
		</Tab>
		<Tab side="right" active={selectedTab === 'net_worth' && true} onTabSelect={setSelectedTab}>
			<Text weight={selectedTab === 'net_worth' ? 'bold' : 'medium'}>Net worth</Text>
		</Tab>
	</View>
);

export default TabSelector;
