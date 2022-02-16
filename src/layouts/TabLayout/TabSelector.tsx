import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
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
	leftTitle: string;
	rightTitle: string;
}

const TabSelector: React.FC<TabSelectorProps> = ({ setSelectedTab, selectedTab, leftTitle, rightTitle }) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.tabContainer, { backgroundColor: colors.background1 }]}>
			<Tab side="left" active={selectedTab === 'transactions' && true} onTabSelect={setSelectedTab}>
				<Text style={{ fontSize: 16 }} weight={selectedTab === 'transactions' ? 'bold' : 'regular'}>
					{leftTitle}
				</Text>
			</Tab>
			<Tab side="right" active={selectedTab === 'net_worth' && true} onTabSelect={setSelectedTab}>
				<Text style={{ fontSize: 16 }} weight={selectedTab === 'net_worth' ? 'bold' : 'regular'}>
					{rightTitle}
				</Text>
			</Tab>
		</View>
	);
};

export default TabSelector;
