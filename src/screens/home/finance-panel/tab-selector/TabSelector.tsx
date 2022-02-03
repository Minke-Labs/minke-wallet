import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';
import globalStyles from '@src/components/global.styles';
import { makeStyles } from './styles';

const TabSelector = ({ selectedTab, onTabSelect }: { selectedTab: string; onTabSelect: Function }) => {
	const roundTabNetWorthPath = 'M0 15.0.0 15.0 0.5 15.0 0.8 15.9C9.6 15.9 16.9 9.1 18 0.324615L18 16H0V15.9Z';
	// eslint-disable-next-line operator-linebreak
	const roundTabTransactionPath =
		'M47 37.9.2 37.9 45.4 37.9 44.7 37.9C21.7 37.9 2.7 21.3 0 -0.191559V38.0001H47V37.9431Z';
	const roundTabNetWorth = '18 14';
	const roundTabTransaction = '36 36';
	let roundTab = roundTabTransaction;
	let roundTabPath = roundTabTransactionPath;

	if (selectedTab === 'net_worth') {
		roundTab = roundTabNetWorth;
		roundTabPath = roundTabNetWorthPath;
	}
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={globalStyles.row}>
			<TouchableOpacity
				disabled={selectedTab === 'transactions'}
				onPress={() => onTabSelect('transactions')}
				style={selectedTab === 'transactions' ? styles.tabActive : styles.tabInactive}
			>
				<Text style={selectedTab === 'transactions' ? styles.tabTitleActive : styles.tabTitleInactive}>
					Transactions
				</Text>
			</TouchableOpacity>
			<Svg
				style={styles.roundInside}
				width={30}
				height={30}
				strokeWidth={1}
				fill={colors.fill}
				viewBox={`0 0 ${roundTab}`}
			>
				<Path d={`${roundTabPath}`} />
			</Svg>
			<TouchableOpacity
				disabled={selectedTab === 'net_worth'}
				onPress={() => onTabSelect('net_worth')}
				style={selectedTab === 'net_worth' ? styles.tabActive : styles.tabInactive}
			>
				<Text style={selectedTab === 'net_worth' ? styles.tabTitleActive : styles.tabTitleInactive}>
					Net worth
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TabSelector;