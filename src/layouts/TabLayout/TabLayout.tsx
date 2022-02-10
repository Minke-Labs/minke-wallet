import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '@hooks';
import SelectTab from './TabSelector';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24
	},
	tabsContainer: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10
	}
});

interface TabSelectorProps {
	left: React.ReactChild;
	right: React.ReactChild;
}

const TabSelector: React.FC<TabSelectorProps> = ({ children, left, right }) => {
	const [selectedTab, setSelectedTab] = useState('transactions');
	const { colors } = useTheme();

	return (
		<View
			style={{
				backgroundColor: colors.background1,
				flex: 1
			}}
		>
			<SafeAreaView>
				<View style={styles.container}>
					{children}
					<SelectTab {...{ setSelectedTab, selectedTab }} />
				</View>
			</SafeAreaView>
			<View
				style={[
					styles.tabsContainer,
					{
						...(selectedTab === 'transactions' ? { borderTopRightRadius: 24 } : { borderTopLeftRadius: 24 })
					}
				]}
			>
				{selectedTab === 'transactions' ? left : right}
			</View>
		</View>
	);
};

export default TabSelector;
