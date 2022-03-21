import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import Tab from './Tab/Tab';
import styles from './TabSelector.styles';
import { TabSelectorProps } from './TabSelector.types';

const TabSelector: React.FC<TabSelectorProps> = ({ setSelectedTab, selectedTab, leftTitle, rightTitle }) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background1 }]}>
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
