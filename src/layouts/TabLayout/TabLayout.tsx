import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useTheme } from '@hooks';
import TabSelector from './TabSelector/TabSelector';
import { styles } from './TabLayout.styles';
import { TabLayoutProps } from './TabLayout.types';

const TabLayout: React.FC<TabLayoutProps> = ({ children, left, right, leftTitle, rightTitle }) => {
	const [selectedTab, setSelectedTab] = useState('transactions');
	const { colors } = useTheme();

	return (
		<View style={{ backgroundColor: colors.background1, flex: 1 }}>
			<SafeAreaView>
				<View style={styles.container}>
					{children}
					<TabSelector {...{ setSelectedTab, selectedTab, leftTitle, rightTitle }} />
				</View>
			</SafeAreaView>
			<View
				style={[
					styles.tabsContainer,
					{
						...(selectedTab === 'transactions' ?
							{ borderTopRightRadius: 24 } :
							{ borderTopLeftRadius: 24 }),
						backgroundColor: colors.detail4
					}
				]}
			>
				{selectedTab === 'transactions' ? left : right}
			</View>
		</View>
	);
};

export default TabLayout;
