import React, { useState } from 'react';
import { View, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import TabSelector from './TabSelector/TabSelector';
import { styles } from './TabLayout.styles';
import { TabLayoutProps } from './TabLayout.types';
import BasicLayout from '../BasicLayout/BasicLayout';

const TabLayout: React.FC<TabLayoutProps> = ({ onRefresh, children, left, right, leftTitle, rightTitle }) => {
	const [selectedTab, setSelectedTab] = useState('transactions');
	const { colors } = useTheme();

	return (
		<BasicLayout hideSafeAreaView>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
			>
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
							...(selectedTab === 'transactions'
								? { borderTopRightRadius: 24 }
								: { borderTopLeftRadius: 24 }),
							backgroundColor: colors.detail4
						}
					]}
				>
					{selectedTab === 'transactions' ? left : right}
				</View>
			</ScrollView>
		</BasicLayout>
	);
};

export default TabLayout;
