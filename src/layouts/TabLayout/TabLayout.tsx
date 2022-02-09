/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@hooks';
// import Header from './Header';
// import AssetsPanel from './AssetsPanel';
// import ActionsPanel from './ActionsPanel';
import FinancePanel from './FinancePanel';
// import { RootStackParamList } from '../../routes/types.routes';
import SelectTab from './TabSelector';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24
	}
});

interface TabSelectorProps {
	left?: React.ReactChild;
	right?: React.ReactChild;
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
			<FinancePanel {...{ selectedTab }} />
		</View>
	);
};

export default TabSelector;
